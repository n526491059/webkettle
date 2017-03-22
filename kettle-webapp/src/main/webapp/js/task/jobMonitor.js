

function generateJobPanel(jobName,createDate,inputName){
    var secondGuidePanel=Ext.getCmp("secondGuidePanel");//二级菜单

    //为表格添加一行复选框用于选择行
    var sm=new Ext.grid.CheckboxSelectionModel();

    //列模型
    var cm=new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),//行序号生成器,会为每一行生成一个行号
        sm,
        {header:"id",width:30,dataIndex:"jobId"},
        {header:"目录",width:60,dataIndex:"directoryName"},
        {header:"名字",width:100,dataIndex:"name"},
        {header:"创建用户",width:100,dataIndex:"createUser"},
        {header:"创建时间",width:150,dataIndex:"createDate",tooltip:"这是创建时间",format:"y-M-d H:m:s"},
        {header:"最终修改的用户",width:100,dataIndex:"modifiedUser",align:"center"},
        {header:"修改时间",width:150,dataIndex:"modifiedDate",format:"y-M-d H:m:s"}
        /*  {header:"是否激活",width:200,dataIndex:"enabled",
         renderer:function(v){
         if(v=="Y"){
         return "已激活";
         }else{
         return "未激活";
         }
         }
         },*/
    ]);

    //准备数据 使用HttpProxy方式从后台获取json格式的数据
    var proxy=new Ext.data.HttpProxy({url:"/task/getJobs.do"});

    //Record定义记录结果
    var human=Ext.data.Record.create([
        {name:"jobId",type:"string",mapping:"jobId"},
        {name:"directoryName",type:"string",mapping:"directoryName"},
        {name:"name",type:"string",mapping:"name"},
        {name:"createUser",type:"string",mapping:"createUser"},
        {name:"createDate",type:"string",mapping:"createDate"},
        {name:"modifiedUser",type:"string",mapping:"modifiedUser"},
        {name:"modifiedDate",type:"string",mapping:"modifiedDate"}
    ])
    var reader=new Ext.data.JsonReader({totalProperty:"totalProperty",root:"root"},human);

    var store=new Ext.data.Store({
        proxy:proxy,
        reader:reader
    })
    store.load({params:{start:0,limit:15,name:jobName,date:createDate}});

    var nameField=new Ext.form.TextField({
        name: "name",
        fieldLabel: "作业名",
        width:100,
        value:inputName
    })

    var dateField=new Ext.form.DateField({
        name: "createDate",
        fieldLabel: "创建日期",
        width: 100,
        format: "Y-m-d"
    })

    f=new Ext.form.FormPanel({
        width:350,
        autoHeight:true,
        frame:true,
        labelWidth:50,
        labelAlign:"right",
        items:[
            {
                layout:"column",    //横向布局(列布局),左到右
                items:[
                    {layout:"form", items:[nameField]},     //每一个是单独的表单控件,单个使用纵向布局,上到下
                    {layout:"form",items:[dateField]}
                ]
            }
        ]
    })



    var grid=new Ext.grid.GridPanel({
        id:"JobPanel",
        title:"JobPanel",
        width:1200,
        height:470,
        cm:cm,      //列模型
        sm:sm,
        store:store,
        closable:true,
        tbar:new Ext.Toolbar({
            buttons:[
                f ,"-",
                {
                    text:"查询",
                    handler:function(){
                        var transValue= f.getForm().findField("name").getValue();
                        var createDate= f.getForm().findField("createDate").getRawValue();
                        secondGuidePanel.removeAll(true);
                        secondGuidePanel.add(generateJobPanel(transValue,createDate,transValue));
                        secondGuidePanel.doLayout();
                    }
                },'-',
                {
                    text:"删除所选行",
                    handler:function(){
                        var flag=false;
                        var view=grid.getView();
                        //获得行选择模型
                        var rsm=grid.getSelectionModel();
                        //定义存放所选行的一至多个作业的id
                        var pathArray=new Array();
                        for(var i= 0;i<view.getRows().length;i++){
                            //判断是否被选中
                            if(rsm.isSelected(i)){
                                flag=true;
                                //获得第i行中 列名为jodId的那一列的值 并且添加的数组中
                                pathArray.push(grid.getStore().getAt(i).get("directoryName"));
                            }
                        }
                        if(flag==true){
                            Ext.MessageBox.confirm("确认","确认删除所选行?",function(btn){
                                if(btn=="yes"){
                                    Ext.Ajax.request({
                                        url:"/task/delete.do",
                                        success:function(response,config){
                                            secondGuidePanel.removeAll(true);
                                            secondGuidePanel.add(generateJobPanel("","",undefined));
                                            secondGuidePanel.doLayout();
                                            Ext.MessageBox.alert("提示","删除作业成功~!");
                                        },
                                        failure:function(){
                                            Ext.MessageBox.alert("result","内部错误,删除失败!")
                                        },
                                        params:{path:pathArray,flag:"job"}
                                    })
                                }
                            })
                        }else{
                            Ext.MessageBox.alert("提示","请先选择所需要删除的行再进行该操作!")
                        }
                    }
                },"-",{
                    text:"执行作业",
                    handler:function(){
                        var path="";//被选中的任务路径
                        var view=grid.getView();
                        var num=0;
                        var rsm=grid.getSelectionModel();
                        for(var i= 0;i<view.getRows().length;i++){
                            if(rsm.isSelected(i)){
                                //获取被选中的作业全目录路径
                                path=grid.getStore().getAt(i).get("directoryName");
                                num++;
                            }
                        }
                        if(num!=1){
                            Ext.MessageBox.alert("请先选择一个(只能一个)作业再执行");
                            return;
                        }
                        var executeWindow=generateSlaveWindow(path,"job");
                        executeWindow.show(grid);
                    }
                },"-",{
                    text:"智能执行",
                    handler:function(){
                        var path="";
                        var view=grid.getView();
                        var rsm=grid.getSelectionModel();
                        var num=0;
                        for(var i= 0;i<view.getRows().length;i++){
                            if(rsm.isSelected(i)){
                                //获取被选中的转换全目录路径
                                path=grid.getStore().getAt(i).get("directoryName");
                                num++;
                            }
                        }
                        if(num!=1){
                            Ext.MessageBox.alert("请先选择一个(只能一个)作业再执行");
                            return;
                        }
                        Ext.MessageBox.confirm("确认","确认执行?",function(btn){
                            if(btn=="yes"){
                                powerExecute(path,"job");
                            }else{
                                return;
                            }
                        })
                    }
                },"-",{
                    text:"定时执行",
                    handler:function(){
                        var view=grid.getView();
                        var rsm=grid.getSelectionModel();
                        var num=0;
                        for(var i= 0;i<view.getRows().length;i++){
                            if(rsm.isSelected(i)){
                                num++;
                            }
                        }
                        if(num!=1){
                            Ext.MessageBox.alert("请先选择一个(只能一个)作业再进行定时设置");
                            return;
                        }
                        var fiexdWindow=fixedExecuteWindow("添加",new Array(),"/task/fiexdExecute.do");
                        fiexdWindow.show(grid);
                    }
                },"-",{
                    text:"编辑作业",
                    handler:function(){
                        var path="";//被选中的任务路径
                        var view=grid.getView();
                        var rsm=grid.getSelectionModel();
                        for(var i= 0;i<view.getRows().length;i++){
                            if(rsm.isSelected(i)){
                                //获取被选中的作业全目录路径
                                path=grid.getStore().getAt(i).get("directoryName");
                            }
                        }
                        secondGuidePanel.removeAll(true);
                        Ext.Ajax.request({
                            url: GetUrl('repository/open.do'),
                            timeout: 120000,
                            params: {path: path, type: 'job'},
                            method: 'POST',
                            success: function(response, opts) {
                                try {

                                    var jobComponentTree = new Ext.tree.TreePanel({
                                        region: 'west',
                                        split: true,
                                        width: 200,

                                        title: '核心对象',
                                        useArrows: true,
                                        root: new Ext.tree.AsyncTreeNode({text: 'root'}),
                                        loader: new Ext.tree.TreeLoader({
                                            dataUrl: GetUrl('system/jobentrys.do')
                                        }),
                                        enableDD:true,
                                        ddGroup:'TreePanelDDGroup',
                                        autoScroll: true,
                                        animate: false,
                                        rootVisible: false
                                    });

                                    var graphPanel = Ext.create({repositoryId: path, region: 'center'}, 'JobGraph');

                                    secondGuidePanel.add({
                                        layout: 'border',
                                        items: [jobComponentTree, graphPanel]
                                    });
                                    secondGuidePanel.doLayout();

                                    activeGraph = graphPanel;


                                    var xmlDocument = mxUtils.parseXml(decodeURIComponent(response.responseText));
                                    var decoder = new mxCodec(xmlDocument);
                                    var node = xmlDocument.documentElement;

                                    var graph = graphPanel.getGraph();
                                    decoder.decode(node, graph.getModel());

                                    graphPanel.fireEvent('load');
                                } finally {
                                    Ext.getBody().unmask();
                                }
                            },
                            failure: failureResponse
                        });
                    }
                },"-",{
                    text:"结构图",
                    handler:function () {
                            var taskName="";//被选中的任务路径
                            var view=grid.getView();
                            var rsm=grid.getSelectionModel();
                            for(var i= 0;i<view.getRows().length;i++){
                                if(rsm.isSelected(i)){
                                    //获取被选中的作业全目录路径
                                    taskName=grid.getStore().getAt(i).get("directoryName");
                                }
                            }
                        Ext.Ajax.request({
                                url: GetUrl('task/detail.do'),
                                method: 'POST',
                                params: {taskName: taskName,type:'job'},
                                success: function(response) {
                                    alert(response.responseText);
                                    var resObj = Ext.decode(response.responseText);
                                    var graphPanel = Ext.create({border: false, Executable: true, showResult: true }, resObj.GraphType);
                                    var dialog = new LogDetailDialog({
                                        items: graphPanel
                                    });
                                    dialog.show(null, function() {
                                        var xmlDocument = mxUtils.parseXml(decodeURIComponent(resObj.graphXml));
                                        var decoder = new mxCodec(xmlDocument);
                                        var node = xmlDocument.documentElement;

                                        var graph = graphPanel.getGraph();
                                        decoder.decode(node, graph.getModel());
                                        graphPanel.setTitle(graph.getDefaultParent().getAttribute('name'));

                                        graphPanel.doResult(Ext.decode(resObj.executionLog));
                                    });
                                },
                            });
                    }
                }
            ]
        }),
        bbar:new Ext.PagingToolbar({
            store:store,
            pageSize:15,
            displayInfo:true,
            displayMsg:"本页显示第{0}条到第{1}条的记录,一共{2}条",
            emptyMsg:"没有记录"
        })
    });
    grid.getColumnModel().setHidden(2,true);
    
    return grid;
}

//获得被选中的作业的id 全目录名 作业名等信息
function getJobInfo(){
    var result=new Array();
    var jobId=0;
    var jobName="";
    var jobPath="";
    var grid=Ext.getCmp("JobPanel");
    var view=grid.getView();
    var rsm=grid.getSelectionModel();
    for(var i= 0;i<view.getRows().length;i++){
        if(rsm.isSelected(i)){
            //获取被选中的转换全目录路径
            jobPath=grid.getStore().getAt(i).get("directoryName");
            jobId=grid.getStore().getAt(i).get("jobId");
            jobName=grid.getStore().getAt(i).get("name");
            result.push(jobId);
            result.push(jobName);
            result.push(jobPath);
        }
    }
    return result;
}


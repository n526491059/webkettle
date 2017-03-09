//转换
function generateTrans(transName,createDate,inputName){
    var secondGuidePanel=Ext.getCmp("secondGuidePanel");
    //为表格添加一行复选框用于选择需要操作 的记录
    var sm=new Ext.grid.CheckboxSelectionModel();
    //列模型
    var cm=new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),//行序号生成器,会为每一行生成一个行号
        sm,
        {header:"转换ID",width:30,dataIndex:"transformationId"},
        {header:"目录",width:150,dataIndex:"directoryName"},
        {header:"转换名",width:150,dataIndex:"name"},
        {header:"创建用户",width:100,dataIndex:"createUser"},
        {header:"创建时间",width:150,dataIndex:"createDate",tooltip:"这是创建时间",format:"y-M-d H:m:s"},
        {header:"最终修改的用户",width:100,dataIndex:"modifiedUser",align:"center"},
        {header:"修改时间",width:150,dataIndex:"modifiedDate",format:"y-M-d H:m:s"}
    ]);

    //准备数据 使用HttpProxy方式从后台获取json格式的数据
    var proxy=new Ext.data.HttpProxy({url:"/task/getTrans.do"});

    //Record定义记录结果
    var human=Ext.data.Record.create([
        {name:"transformationId",type:"string",mapping:"transformationId"},
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
    store.load({params:{start:0,limit:15,name:transName,date:createDate}});


    var nameField=new Ext.form.TextField({
        name: "name",
        fieldLabel: "转换名",
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
        id:"transPanel",
        title:"transPanel",
        width:1100,
        height:470,
        cm:cm,      //列模型
        sm:sm,      //行选择框
        store:store,    //数据源
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
                        secondGuidePanel.add(generateTrans(transValue,createDate,transValue));
                        secondGuidePanel.doLayout();
                    }
                },'-',
                {
                    text:"删除所选转换",
                    handler:function(){
                        var flag=false;
                        var view=grid.getView();
                        //数组用来存放用户选择的一至多行的转换的绝对目录名
                        var pathArray=new Array();
                        //获得行选择模型
                        var rsm=grid.getSelectionModel();
                        //遍历所有行
                        for(var i= 0;i<view.getRows().length;i++){
                            //判断是否被选中，参数i代表行号
                            if(rsm.isSelected(i)){
                                flag=true;
                                //如果该行被选中则获取该行列名为transformationId的单元格的值,并且放入数组
                                pathArray.push(grid.getStore().getAt(i).get("directoryName"));
                            }
                        }
                        if(flag==true){
                            Ext.MessageBox.confirm("确认","确认删除所选转换?",function(btn){
                                if(btn=="yes"){
                                    Ext.Ajax.request({
                                        url:"/task/delete.do",
                                        success:function(response,config){
                                            secondGuidePanel.removeAll(true);
                                            secondGuidePanel.add(generateTrans("","",undefined));
                                            secondGuidePanel.doLayout();
                                            Ext.MessageBox.alert("提示","删除转换记录成功~!")
                                        },
                                        failure:function(){
                                            Ext.MessageBox.alert("result","内部错误,删除失败!")
                                        },
                                        params:{path:pathArray,flag:"transformation"}
                                    })
                                }
                            });
                        }else{
                            Ext.MessageBox.alert("提示","请先勾选需要删除的行再进行该操作!");
                        }
                    }
                },"-", {
                    text:"执行转换",
                    handler:function(){
                       var path="";
                        var view=grid.getView();
                        var rsm=grid.getSelectionModel();
                        for(var i= 0;i<view.getRows().length;i++){
                            if(rsm.isSelected(i)){
                                //获取被选中的转换全目录路径
                                path=grid.getStore().getAt(i).get("directoryName");
                            }
                        }
                        var executeWindow=generateSlaveWindow(path,"transformation");
                        executeWindow.show(grid);
                    }
                },"-",{
                    text:"智能执行",
                    handler:function(){
                        Ext.MessageBox.confirm("确认","确认执行?",function(btn){
                            if(btn=="yes"){
                                var path="";
                                var view=grid.getView();
                                var rsm=grid.getSelectionModel();
                                for(var i= 0;i<view.getRows().length;i++){
                                    if(rsm.isSelected(i)){
                                        //获取被选中的转换全目录路径
                                        path=grid.getStore().getAt(i).get("directoryName");
                                    }
                                }
                                powerExecute(path,"transformation");
                            }else{
                                return;
                            }
                        })
                    }
                },"-",{
                    text:"编辑转换",
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
                            params: {path: path, type: 'transformation'},
                            method: 'POST',
                            success: function(response, opts) {
                                try {
                                    var transComponentTree = new Ext.tree.TreePanel({
                                        region: 'west',
                                        split: true,
                                        width: 200,

                                        title: '核心对象',
                                        useArrows: true,
                                        root: new Ext.tree.AsyncTreeNode({text: 'root'}),
                                        loader: new Ext.tree.TreeLoader({
                                            dataUrl: GetUrl('system/steps.do')
                                        }),
                                        enableDD:true,
                                        ddGroup:'TreePanelDDGroup',
                                        autoScroll: true,
                                        animate: false,
                                        rootVisible: false
                                    });

                                    var graphPanel = Ext.create({repositoryId: path, region: 'center'}, 'TransGraph');

                                    secondGuidePanel.add({
                                        layout: 'border',
                                        items: [transComponentTree, graphPanel]
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
                            params: {taskName: taskName,type:'trans'},
                            success: function(response) {
                                var resObj = Ext.decode(response.responseText);
                                var graphPanel = Ext.create({border: false, readOnly: true, }, resObj.GraphType);
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
                            }
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
    //grid.getColumnModel().setHidden(3,true);
    return grid;
}



function closeWindwo(){
    Ext.getCmp("executeWindow").close();
}

//智能执行
function powerExecute(path,powerFlag){
    Ext.Ajax.request({
        url:"/task/powerExecute.do",
        success:function(response,config){
            Ext.MessageBox.alert("result","已执行")
        },
        failure:function(){
            Ext.MessageBox.alert("result","内部错误,执行失败!")
        },
        params:{path:path,powerFlag:powerFlag}
    })

}
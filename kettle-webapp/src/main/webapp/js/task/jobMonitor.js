//作业面板
function generateJobPanel(jobName,createDate,inputName){
    var secondGuidePanel=Ext.getCmp("secondGuidePanel");//二级菜单

    //为表格添加一行复选框用于选择行
    var sm=new Ext.grid.CheckboxSelectionModel();

    //列模型
    var cm=new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),//行序号生成器,会为每一行生成一个行号
        sm,
        {header:"id",dataIndex:"jobId"},
        {header:"目录",width:150,dataIndex:"directoryName"},
        {header:"名字",width:150,dataIndex:"name"},
        {header:"创建用户",width:100,dataIndex:"createUser"},
        {header:"创建时间",width:130,dataIndex:"createDate",tooltip:"这是创建时间",format:"y-M-d H:m:s"},
        {header:"最终修改者",width:100,dataIndex:"modifiedUser",align:"center"},
        {header:"修改时间",width:130,dataIndex:"modifiedDate",format:"y-M-d H:m:s"},
        {header:"所属任务组",dataIndex:"belongToTaskGroup"},
        {header:"作业属性",width:280,dataIndex:"",menuDisabled:true,align:"center",
            renderer:function(v){
                return "<input type='button' onclick='showOneJobDetail()' value='查看'>&nbsp;"+
                    "<input type='button' onclick='deleteJobByJobPath()' value='删除'>&nbsp;"+
                    "<input type='button' onclick='editorJob()' value='编辑'>&nbsp;"+
                    "<input type='button' onclick='jobCompositionImg()' value='结构图'>&nbsp;"+
                    "<input type='button' onclick='jobPowerExecute()' value='智能执行'>&nbsp;";
            }
        }
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
        {name:"modifiedDate",type:"string",mapping:"modifiedDate"},
        {name:"belongToTaskGroup",type:"string",mapping:"belongToTaskGroup"}
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
                }/*,'-',
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
                }*/,"-",{
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
                },"-",
                {
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
                },"-",
                {
                    text:"分配任务组",
                    handler:function () {
                        beforeAssignedTaskGroup(grid,secondGuidePanel);
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
    grid.getColumnModel().setHidden(9,true);
    return grid;
}

function jobPowerExecute(){
    var grid=Ext.getCmp("JobPanel");
    var path=grid.getSelectionModel().getSelected().get("directoryName");
    Ext.MessageBox.confirm("确认","确认执行?",function(btn){
        if(btn=="yes"){
            powerExecute(path,"job");
        }else{
            return;
        }
    })
}

//结构图
function jobCompositionImg(){
    var secondGuidePanle=Ext.getCmp("secondGuidePanel");
    var grid=Ext.getCmp("JobPanel");
    var taskName=grid.getSelectionModel().getSelected().get("directoryName");//被选中的任务路径
    Ext.Ajax.request({
        url: GetUrl('task/detail.do'),
        method: 'POST',
        params: {taskName: taskName,type:'job'},
        success: function(response) {
            var resObj = Ext.decode(response.responseText);
            var graphPanel = Ext.create({border: false, readOnly: true }, resObj.GraphType);
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

//编辑作业
function editorJob(){
    var secondGuidePanel=Ext.getCmp("secondGuidePanel");
    var grid=Ext.getCmp("JobPanel");
    var path=grid.getSelectionModel().getSelected().get("directoryName");

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

//删除作业
function deleteJobByJobPath(){
    var grid=Ext.getCmp("JobPanel");
    var secondGuidePanel=Ext.getCmp("secondGuidePanel");
    var jobPath=grid.getSelectionModel().getSelected().get("directoryName");
    Ext.MessageBox.confirm("确认","确认删除该作业?",function(btn){
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
                params:{path:jobPath,flag:"job"}
            })
        }
    })
}

//显示作业的详细信息
function showOneJobDetail(){
    var transGrid=Ext.getCmp("JobPanel");
    var record=transGrid.getSelectionModel().getSelected();
    var thisBelongToTaskGroup=record.get("belongToTaskGroup");
    var thisName=record.get("name");
    //拼接窗口所需要显示的内容
    var htmlInfo="";
    if(thisBelongToTaskGroup!=undefined && thisBelongToTaskGroup.trim()!=""){
        htmlInfo+="<h4>所属任务组</h4>"
        var taskGroupArray=new Array();
        taskGroupArray=thisBelongToTaskGroup.split(",");
        for(var i=0;i<taskGroupArray.length;i++){
            htmlInfo+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+(i+1)+":&nbsp;&nbsp;&nbsp;"+taskGroupArray[i]+"<br/>";
        }
    }else{
        htmlInfo="该作业暂未分配任务组"
    }
    var oneJobDetailWindow=new Ext.Window({
        id:"oneJobDetailWindow",
        title:thisName,
        bodyStyle:"background-color:white",
        width:455,
        height:450,
        html:htmlInfo
    });
    oneJobDetailWindow.show(transGrid);
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

//分配任务组
function beforeAssignedTaskGroup(grid,secondGuidePanel){
    var view=grid.getView();
    var rsm=grid.getSelectionModel();
    var jobNameArray=new Array();
    var jobId="";
    var jobPath="";
    for(var i= 0;i<view.getRows().length;i++){
        if(rsm.isSelected(i)){
            //获取被选中的作业名 作业Id    作业全目录名
            jobNameArray.push(grid.getStore().getAt(i).get("name"));
            jobId=grid.getStore().getAt(i).get("jobId");
            jobPath=grid.getStore().getAt(i).get("directoryName");
        }
    }
    if(jobNameArray.length!=1){
        Ext.MessageBox.alert("请选择一个作业(单选)再分配任务组");
    }else{
        showWindowByAssigned(jobId,jobPath,jobNameArray[0],grid,secondGuidePanel);
    }
}

//展示分配任务组的窗口
function showWindowByAssigned(jobId,jobPath,jobName,grid,secondGuidePanel){
    var panelByAssigned=generateAllTaskGroupPanel(jobId,jobPath,jobName,"noCreate");
    var taskGroupAssignedWindow=new Ext.Window({
        id:"taskGroupAssignedWindow",
        title:"任务组分配",
        bodyStyle:"background-color:white",
        width:455,
        height:570,
        items:[
            panelByAssigned
        ]
    });
    taskGroupAssignedWindow.show(grid);
}

//获取该用户下的所有任务组  并且设置任务组是否包含该任务的标识
function generateAllTaskGroupPanel(jobId,jobPath,jobName,flag){
    var sm2=new Ext.grid.CheckboxSelectionModel();
    //节点列模型
    var taskGroupModel=new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),//行序号生成器,会为每一行生成一个行号
        sm2,
        {header:"任务组ID",dataIndex:"taskGroupId"},
        {header:"isContainsTask",dataIndex:"isContainsTask"},
        {header:"任务组名",dataIndex:"taskGroupName"},
        {header:"任务组描述",dataIndex:"taskGroupDesc"}
    ]);

    var proxy=new Ext.data.HttpProxy({url:"/taskGroup/isContainsTaskBeforeAssigned.do"});

    var taskGroupRecord=Ext.data.Record.create([
        {name:"taskGroupId",type:"string",mapping:"taskGroupId"},
        {name:"isContainsTask",type:"string",mapping:"isContainsTask"},
        {name:"taskGroupName",type:"string",mapping:"taskGroupName"},
        {name:"taskGroupDesc",type:"string",mapping:"taskGroupDesc"}
    ])
    var reader=new Ext.data.JsonReader({},taskGroupRecord);
    var store=new Ext.data.Store({
        proxy:proxy,
        reader:reader
    })
    store.load({params:{name:jobName,type:"job"}});

    var taskGroupPanelByAssigned=new Ext.grid.GridPanel({
        id:"taskGroupPanelByAssigned",
        width:450,
        height:550,
        autoScroll:true,//滚动条
        cm:taskGroupModel,
        sm:sm2,
        store:store,
        closable:true,
        viewConfig : {
            forceFit : true //让grid的列自动填满grid的整个宽度，不用一列一列的设定宽度
        },
        tbar:new Ext.Toolbar({
            buttons: [
                {
                    text:"确认",
                    handler:function(){
                        assignedTaskGroup(jobId,jobName,jobPath,taskGroupPanelByAssigned,flag);
                    }
                }
            ]
        })
    });
    //监听事件 panel数据加载完毕后执行
    taskGroupPanelByAssigned.store.on("load",function(store) {
        //遍历所有任务组 判断是否包含了用户选中的任务 如果包含则选中该行
        var view=taskGroupPanelByAssigned.getView();
        var rsm=taskGroupPanelByAssigned.getSelectionModel();
        var chooseIndex=new Array();
        for(var i= 0;i<view.getRows().length;i++){
            var isContains=taskGroupPanelByAssigned.getStore().getAt(i).get("isContainsTask");
            //标识符为Y代表该任务组包含了用户选中的任务 则选中该行
            if(isContains=="YES"){
                chooseIndex.push(i);
            }
        }
        rsm.selectRows(chooseIndex,true);
    },taskGroupPanelByAssigned);
    //隐藏第二列和第三列
    taskGroupPanelByAssigned.getColumnModel().setHidden(2,true);
    taskGroupPanelByAssigned.getColumnModel().setHidden(3,true);
    return taskGroupPanelByAssigned;
}

//访问后台分配任务组
function assignedTaskGroup(jobId,jobName,jobPath,taskGroupPanelByAssigned,flag){
    var view=taskGroupPanelByAssigned.getView();
    var rsm=taskGroupPanelByAssigned.getSelectionModel();
    var taskGroupNameArray=new Array();
    for(var i= 0;i<view.getRows().length;i++){
        if(rsm.isSelected(i)){
            taskGroupNameArray.push(taskGroupPanelByAssigned.getStore().getAt(i).get("taskGroupName"));
        }
    }
    Ext.MessageBox.confirm("确认","确认按照如下选择分配该任务组?",function(btn){
        if(btn=="yes"){
            Ext.Ajax.request({
                url:"/taskGroup/assignedTaskGroup.do",
                success:function(response,config){
                    Ext.MessageBox.alert("任务组分配成功!");
                    var secondGuidePanel=Ext.getCmp("secondGuidePanel");
                    if(flag!="create"){
                        Ext.getCmp("taskGroupAssignedWindow").close();
                        secondGuidePanel.removeAll(true);
                        secondGuidePanel.add(generateJobPanel("","",undefined));
                        secondGuidePanel.doLayout();
                    }else{
                        Ext.getCmp("assignedWindowByCreate").close();
                        Ext.getCmp("jobBodyPanel").enable();
                        Ext.getCmp("jobWestTreePanel").enable();
                    }

                },
                failure:function(){
                    if(flag!="create"){
                        Ext.getCmp("taskGroupAssignedWindow").close();
                    }
                    Ext.MessageBox.alert("result","服务器异常,任务组分配失败!");

                },
                params:{taskId:jobId,taskName:jobName,taskPath:jobPath,type:"job",taskGroupNameArray:taskGroupNameArray}
            })
        }else{
            return;
        }
    })
}




//转换
function generateTrans(secondGuidePanel){
    //为表格添加一行复选框用于选择需要操作 的记录
    var sm=new Ext.grid.CheckboxSelectionModel();
    //列模型
    var cm=new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),//行序号生成器,会为每一行生成一个行号
        sm,
        {header:"转换ID",dataIndex:"transformationId",align:"center"},
        {header:"目录",width:150,dataIndex:"directoryName",align:"center"},
        {header:"转换名",width:150,dataIndex:"name",align:"center"},
        {header:"创建用户",width:100,dataIndex:"createUser",align:"center"},
        {header:"创建时间",width:130,dataIndex:"createDate",tooltip:"这是创建时间",format:"y-M-d H:m:s",align:"center"},
        {header:"最终修改者",width:100,dataIndex:"modifiedUser",align:"center",align:"center"},
        {header:"修改时间",width:130,dataIndex:"modifiedDate",format:"y-M-d H:m:s",align:"center"},
        {header:"所属任务组",dataIndex:"belongToTaskGroup",align:"center"},
        {header:"操作",width:280,dataIndex:"",menuDisabled:true,align:"center",
            renderer:function(v){
                if(loginUserTaskGroupPower==1 || loginUserName=="admin"){
                    return "<img src='../../ui/images/i_detail.png' class='imgCls' onclick='showOneTransDetail()' title='查看转换属性'/>&nbsp;&nbsp;"+
                        "<img src='../../ui/images/i_delete.png' class='imgCls' onclick='deleteTransByTransPath()' title='删除'/>&nbsp;&nbsp;"+
                        "<img src='../../ui/images/i_editor.png' class='imgCls' onclick='editorTrans()' title='编辑'/>&nbsp;&nbsp;"+
                        "<img src='../../ui/images/i_compositionImg.png' class='imgCls' onclick='transCompositionImg()' title='结构图'/>&nbsp;&nbsp;"+
                        "<img src='../../ui/images/i_execute.png' class='imgCls' onclick='executeTrans()' title='执行转换配置'/>&nbsp;&nbsp;"+
                        "<img src='../../ui/images/i_assigned.png' class='imgCls' onclick='beforeAssigned()' title='分配任务组'/>&nbsp;&nbsp;"+
                        "<img src='../../ui/images/i_power.png' class='imgCls' onclick='transPowerExecute()' title='智能执行'/>&nbsp;&nbsp;";
                }else{
                    return "<img src='../../ui/images/i_detail.png' class='imgCls' onclick='showOneTransDetail()' title='查看转换属性'/>&nbsp;&nbsp;"+
                        "<img src='../../ui/images/i_compositionImg.png' class='imgCls' onclick='transCompositionImg()' title='结构图'/>&nbsp;&nbsp;";
                }
            }
        }
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
        {name:"modifiedDate",type:"string",mapping:"modifiedDate"},
        {name:"belongToTaskGroup",type:"string",mapping:"belongToTaskGroup"},

    ])
    var reader=new Ext.data.JsonReader({totalProperty:"totalProperty",root:"root"},human);

    var store=new Ext.data.Store({
        proxy:proxy,
        reader:reader,
        listeners: {
            "beforeload": function(store) {
                var transName="";
                var createDate="";
                if(Ext.getCmp("transMonitorForm")!=undefined){
                    transName=Ext.getCmp("transMonitorForm").getForm().findField("name").getValue();
                    createDate=Ext.getCmp("transMonitorForm").getForm().findField("createDate").getValue();
                }
                store.baseParams = {
                    name:transName,
                    date:createDate
                }
            }
        }
    })
    store.load({params:{start:0,limit:15}});


    var inputTransName="";
    if(Ext.getCmp("transMonitorForm")!=undefined){
        inputTransName=Ext.getCmp("transMonitorForm").getForm().findField("name").getValue();
    }
    var nameField=new Ext.form.TextField({
        name: "name",
        fieldLabel: "转换名",
        width:100,
        value:inputTransName
    })
    var dateField=new Ext.form.DateField({
        name: "createDate",
        fieldLabel: "创建日期",
        width: 100,
        format: "Y-m-d"
    })


    f=new Ext.form.FormPanel({
        id:"transMonitorForm",
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
        title:"<font size = '3px' >转换管理</font>",
        height:470,
        cm:cm,      //列模型
        sm:sm,      //行选择框
        store:store,    //数据源
        viewConfig : {
            forceFit : true //让grid的列自动填满grid的整个宽度，不用一列一列的设定宽度
        },
        closable:true,
        tbar:new Ext.Toolbar({
            buttons:[
                f ,"-",
                {
                    iconCls:"searchCls",
                    tooltip: '查询',
                    handler:function(){
                        generateTrans(secondGuidePanel);
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
    secondGuidePanel.removeAll(true);
    secondGuidePanel.add(grid);
    secondGuidePanel.doLayout();
}

//执行转换配置
function executeTrans(){
    var grid=Ext.getCmp("transPanel");
    var path=grid.getSelectionModel().getSelected().get("directoryName");
    /* var executeWindow=generateSlaveWindow(path,"transformation");
     executeWindow.show(grid);*/
    Ext.Ajax.request({
        url: GetUrl('task/detail.do'),
        method: 'POST',
        params: {taskName: path,type:'trans'},
        success: function(response) {
            var resObj = Ext.decode(response.responseText);
            var graphPanel = Ext.create({border: false, Executable:true},resObj.GraphType);
            var dialog = new LogDetailDialog({
                items: graphPanel
            });
            activeGraph = graphPanel;
            dialog.show(null, function() {
                var xmlDocument = mxUtils.parseXml(decodeURIComponent(resObj.graphXml));
                var decoder = new mxCodec(xmlDocument);
                var node = xmlDocument.documentElement;
                var graph = graphPanel.getGraph();
                decoder.decode(node, graph.getModel());
                graphPanel.setTitle(graph.getDefaultParent().getAttribute('name'));
            });
        }
    });
}

//智能执行转换
function transPowerExecute(){
    var grid=Ext.getCmp("transPanel");
    var path=grid.getSelectionModel().getSelected().get("directoryName");
    Ext.MessageBox.confirm("确认","确认执行?",function(btn){
        if(btn=="yes"){
            powerExecute(path,"transformation");
        }else{
            return;
        }
    })
}

//转换结构图
function  transCompositionImg(){
    var grid=Ext.getCmp("transPanel");
    var secondGuidePanel=Ext.getCmp("secondGuidePanel");
    var taskName=grid.getSelectionModel().getSelected().get("directoryName");//被选中的任务路径

    Ext.Ajax.request({
        url: GetUrl('task/detail.do'),
        method: 'POST',
        params: {taskName: taskName,type:'trans'},
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
            });
        }
    });
}

//编辑转换
function editorTrans(){
    var grid=Ext.getCmp("transPanel");
    var secondGuidePanel=Ext.getCmp("secondGuidePanel");
    var path=grid.getSelectionModel().getSelected().get("directoryName");
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

//删除转换
function deleteTransByTransPath(){
    var grid=Ext.getCmp("transPanel");
    var secondGuidePanel=Ext.getCmp("secondGuidePanel");
    var transPath=grid.getSelectionModel().getSelected().get("directoryName");
    Ext.MessageBox.confirm("确认","确认删除该转换?",function(btn){
        if(btn=="yes"){
            Ext.Ajax.request({
                url:"/task/delete.do",
                success:function(response,config){
                    generateTrans(secondGuidePanel);
                    Ext.MessageBox.alert("提示","删除转换成功~!");
                },
                failure:failureResponse,
                params:{path:transPath,flag:"transformation"}
            })
        }
    })
}

//显示某个转换的详情
function showOneTransDetail(){
    var transGrid=Ext.getCmp("transPanel");
    var record=transGrid.getSelectionModel().getSelected();
    var thisBelongToTaskGroup=record.get("belongToTaskGroup");
    var thisName=record.get("name");
    //拼接窗口所需要显示的内容
    var htmlInfo="<table cellpadding='0' cellspacing='0' width='440' bgcolor='white' border='1'>"
    if(thisBelongToTaskGroup!=undefined && thisBelongToTaskGroup.trim()!=""){
        var taskGroupArray=new Array();
        taskGroupArray=thisBelongToTaskGroup.split(",");

        for(var i=0;i<taskGroupArray.length;i++){
            if(i==0)
                htmlInfo+="<tr><td align='center' rowspan='"+taskGroupArray.length+"'>所属任务组</td>"
            else
                htmlInfo+="<tr>"
            htmlInfo+="<td align='center'>"+taskGroupArray[i]+"</td></tr>"
        }
    }else{
        htmlInfo+="<tr><td align='center'>所属任务组</td><td align='center'>暂未分配任务组</td></tr>";
    }
    htmlInfo+="</table>";
    var oneTransDetailWindow=new Ext.Window({
        id:"oneTransDetailWindow",
        title:thisName,
        bodyStyle:"background-color:white",
        width:455,
        modal:true,
        html:htmlInfo
    });
    oneTransDetailWindow.show(transGrid);
}

//分配任务组 获取信息
function beforeAssigned(){
    var secondGuidePanel=Ext.getCmp("secondGuidePanel");
    var grid=Ext.getCmp("transPanel");
    var record=grid.getSelectionModel().getSelected();
    var transId=record.get("transformationId");
    var transPath=record.get("directoryName");
    var transName=record.get("name");
    showWindowForAssigned(transId,transPath,transName,grid,secondGuidePanel);

}

//分配任务组 显示窗口
function showWindowForAssigned(transId,transPath,transName,grid,secondGuidePanel){
    var panelByAssigned=AllTaskGroupPanel(transId,transPath,transName);
    var taskGroupAssignedWindow=new Ext.Window({
        id:"assignedWindow",
        title:"<font size = '3px' >任务组分配</font>",
        modal:true,
        bodyStyle:"background-color:white",
        width:455,
        height:570,
        items:[
            panelByAssigned
        ]
    });
    taskGroupAssignedWindow.show(grid);
}

//获取该用户下的所有任务组  并且设置任务组是否包含该转换的标识
function AllTaskGroupPanel(transId,transPath,transName){
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
    store.load({params:{name:transName,type:"trans"}});

    var taskGroupPanelByAssigned=new Ext.grid.GridPanel({
        id:"taskGroupPanelForAssigned",
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
                        assignedGroupTask(transId,transPath,transName,taskGroupPanelByAssigned);
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

//分配任务组 访问后台
function assignedGroupTask(transId,transPath,transName,taskGroupPanelByAssigned){
    var view=taskGroupPanelByAssigned.getView();
    var rsm=taskGroupPanelByAssigned.getSelectionModel();
    var taskGroupNameArray=new Array();
    for(var i= 0;i<view.getRows().length;i++){
        if(rsm.isSelected(i)){
            taskGroupNameArray.push(taskGroupPanelByAssigned.getStore().getAt(i).get("taskGroupName"));
        }
    }
    if(taskGroupNameArray.length>0){
        Ext.Ajax.request({
            url:"/taskGroup/assignedTaskGroup.do",
            success:function(response,config){
                Ext.MessageBox.alert("任务组分配成功!");
                var secondGuidePanel=Ext.getCmp("secondGuidePanel");
                Ext.getCmp("assignedWindow").close();
                generateTrans(secondGuidePanel);
            },
            failure:function(response){
                Ext.getCmp("assignedWindow").close();
                failureResponse(response);
            },
            params:{taskId:transId,taskName:transName,taskPath:transPath,type:"trans",taskGroupNameArray:taskGroupNameArray}
        })
    }else{
        Ext.MessageBox.alert("必须为该转换分配一个任务组");
    }
}

//智能执行
function powerExecute(path,powerFlag){
    Ext.Ajax.request({
        url:"/task/powerExecute.do",
        success:function(response,config){
            Ext.MessageBox.alert("result","已执行")
        },
        failure:failureResponse,
        params:{path:path,powerFlag:powerFlag}
    })

}
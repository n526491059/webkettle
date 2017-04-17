TaskEntity=function(taskId,type,taskPath,taskName){
    this.taskId=taskId;
    this.type=type;
    this.taskPath=taskPath;
    this.taskName=taskName;
}

//任务组管理主面板  展示所有任务组(当前登录用户可见的任务组)
function showTaskGroupPanel(secondGuidePanel){
    var sm2=new Ext.grid.CheckboxSelectionModel();
    //节点列模型
    var taskGroupModel=new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),//行序号生成器,会为每一行生成一个行号
        sm2,
        {header:"任务组ID",dataIndex:"taskGroupId"},
        {header:"任务组名",dataIndex:"taskGroupName"},
        {header:"任务组描述",dataIndex:"taskGroupDesc"}
    ]);

    var proxy=new Ext.data.HttpProxy({url:"/taskGroup/AlltaskGroup.do"});

    var taskGroupRecord=Ext.data.Record.create([
        {name:"taskGroupId",type:"string",mapping:"taskGroupId"},
        {name:"taskGroupName",type:"string",mapping:"taskGroupName"},
        {name:"taskGroupDesc",type:"string",mapping:"taskGroupDesc"}
    ])
    //totalProperty代表总条数 root代表当页的数据
    var reader=new Ext.data.JsonReader({totalProperty:"totalProperty",root:"root"},taskGroupRecord);

    var store=new Ext.data.Store({
        proxy:proxy,
        reader:reader
    })
    store.load({params:{start:0,limit:10}});

    var taskGroupPanel=new Ext.grid.GridPanel({
        id:"slaveGridPanel",
        title:"任务组",
        width:1200,
        height:600,
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
                    text:"新增",
                    handler:function(){
                        addTaksGroupWindow(taskGroupPanel);
                    }
                },"-",
                {
                    text:"删除",
                    handler:function(){
                        deleteTaskGroupAndAttributes(taskGroupPanel);
                    }
                },"-",
                {
                    text:"编辑",
                    handler:function(){
                        beforeUpdateTaskGroup(taskGroupPanel);
                    }
                },"-",
                {
                    text:"查看",
                    handler:function(){
                        beforeSelectTaskGroupDetail(taskGroupPanel);
                    }
                }
            ]
        }),
        bbar:new Ext.PagingToolbar({
            store:store,
            pageSize:10,
            displayInfo:true,
            displayMsg:"本页显示第{0}条到第{1}条的记录,一共{2}条",
            emptyMsg:"没有记录"
        })
    });
    taskGroupPanel.getColumnModel().setHidden(2,true);
    secondGuidePanel.removeAll(true);
    secondGuidePanel.add(taskGroupPanel);
    secondGuidePanel.doLayout();
}

//删除功能  删除任务组并且移除任务组中的所有任务
function deleteTaskGroupAndAttributes(taskGroupPanel){
    var view=taskGroupPanel.getView();
    var rsm=taskGroupPanel.getSelectionModel();
    var taskGroupNames=new Array();
    for(var i=0;i<view.getRows().length;i++) {
        if(rsm.isSelected(i)){
            taskGroupNames.push(taskGroupPanel.getStore().getAt(i).get("taskGroupName"));
        }
    }
    if(taskGroupNames.length<1){
        Ext.MessageBox.alert("请至少选择一个需要删除的任务组");
        return;
    }else{
        Ext.Ajax.request({
            url:"/taskGroup/deleteTaskGroup.do",
            success:function(response,config){
                Ext.MessageBox.alert("result","删除成功!");
                showTaskGroupPanel(Ext.getCmp("secondGuidePanel"));
            },
            failure:function(){
                Ext.MessageBox.alert("result","服务器异常删除失败,请稍后尝试");
            },
            params:{name:taskGroupNames}
        })
    }
}

//查看功能  查看前先获取唯一选中行的任务组名
function beforeSelectTaskGroupDetail(taskGroupPanel){
    var view=taskGroupPanel.getView();
    var rsm=taskGroupPanel.getSelectionModel();
    var flag=0;
    var taskGroupName="";
    for(var i=0;i<view.getRows().length;i++) {
        if(rsm.isSelected(i)){
            taskGroupName=taskGroupPanel.getStore().getAt(i).get("taskGroupName");
            flag++;
        }
    }
    if(flag!=1){
        Ext.MessageBox.alert("请选择需要查看的任务组(只能选中一条)");
        return;
    }else{
        showSelectTaskGroupWindow(taskGroupPanel,taskGroupName);
    }
}

//查看功能 弹出窗口用于展现某个任务组详情列表
function showSelectTaskGroupWindow(taskGroupPanel,taskGroupName){
    var taskGroupAttributesPanel=showSelectTaskGroupPanel(taskGroupName);
    var taskGroupAttributesWindow=new Ext.Window({
        id:"taskGroupAttributesWindow",
        title:taskGroupName,
        bodyStyle:"background-color:white",
        width:610,
        modal:true,
        height:520,
        items:[
            taskGroupAttributesPanel
        ]
    });
    taskGroupAttributesWindow.show(taskGroupPanel);
}

//查看功能 列表用于展现任务组详情(所包含的作业以及转换)
function showSelectTaskGroupPanel(taskGroupName){
    //节点列模型
    var taskGroupAttributesModel=new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),//行序号生成器,会为每一行生成一个行号
        {header:"任务ID",dataIndex:"taskId"},
        {header:"任务类型",dataIndex:"type"},
        {header:"任务名",dataIndex:"taskName"},
        {header:"任务全目录名",dataIndex:"taskPath"}
    ]);

    var proxy=new Ext.data.HttpProxy({url:"/taskGroup/selectTaskGroup.do"});

    var taskGroupAttributesRecord=Ext.data.Record.create([
        {name:"taskId",type:"string",mapping:"taskId"},
        {name:"type",type:"string",mapping:"type"},
        {name:"taskName",type:"string",mapping:"taskName"},
        {name:"taskPath",type:"string",mapping:"taskPath"}
    ])
    //totalProperty代表总条数 root代表当页的数据
    var reader=new Ext.data.JsonReader({},taskGroupAttributesRecord);

    var store=new Ext.data.Store({
        proxy:proxy,
        reader:reader
    })
    store.load({params:{taskGroupName:taskGroupName}});

    var taskGroupAttributesPanel=new Ext.grid.GridPanel({
        id:"taskGroupAttributesPanel",
        width:595,
        height:500,
        cm:taskGroupAttributesModel,
        store:store,
        closable:true,
        viewConfig : {
            forceFit : true //让grid的列自动填满grid的整个宽度，不用一列一列的设定宽度
        }
    });
    taskGroupAttributesPanel.getColumnModel().setHidden(1,true);
    return taskGroupAttributesPanel;
}

//修改功能  修改前
function beforeUpdateTaskGroup(taskGroupPanel){
    var view=taskGroupPanel.getView();
    var rsm=taskGroupPanel.getSelectionModel();
    var taskGroupName="";
    var taskGroupDesc="";
    var taskGroupId="";
    var flag=0;
    for(var i=0;i<view.getRows().length;i++) {
        if(rsm.isSelected(i)){
            taskGroupId=taskGroupPanel.getStore().getAt(i).get("taskGroupId");
            taskGroupName=taskGroupPanel.getStore().getAt(i).get("taskGroupName");
            taskGroupDesc=taskGroupPanel.getStore().getAt(i).get("taskGroupDesc");
            flag++;
        }
    }
    if(flag!=1){
        Ext.MessageBox.alert("请选择需要修改的任务组(只能选中一条)");
    }else{
        showUpdateWindow(taskGroupPanel,taskGroupId,taskGroupName,taskGroupDesc);
    }
}

//修改功能  展示修改界面的表单弹窗
function showUpdateWindow(taskGroupPanel,taskGroupId,taskGroupName,taskGroupDesc){
    //任务组名输入框
    var taskGroupNameField=new Ext.form.TextField({
        id:"taskGroupNameInput",
        name: "taskGroupNameInput",
        fieldLabel: "任务组名",
        width:150,
        value:taskGroupName
    });
    //任务组描述输入框
    var taskGroupDescField=new Ext.form.TextArea({
        id:"taskGroupDescInput",
        name: "taskGroupDescInput",
        fieldLabel: "任务组描述",
        width:300,
        height:100,
        value:taskGroupDesc
    });
    //表单
    var updateTaskGroupForm=new Ext.form.FormPanel({
        id:"updateTaskGroupForm",
        width:500,
        height:220,
        frame:true,
        modal:true,
        labelWidth:130,
        labelAlign:"right",
        items:[
            {
                layout:"form",  //从上往下布局
                items:[taskGroupNameField,taskGroupDescField]
            }
        ]
    });
    var updateTaskGroupWindow=new Ext.Window({
        id:"updateTaskGroupWindow",
        title:"修改任务组",
        bodyStyle:"background-color:white",
        width:500,
        modal:true,
        height:220,
        items:[
            updateTaskGroupForm
        ],
        tbar:new Ext.Toolbar({buttons:[
            {
                text:"修改",
                handler:function(){
                    var inputGroupName=taskGroupNameField.getValue();
                    var inputGroupDesc=taskGroupDescField.getValue();
                    if(inputGroupName==undefined || inputGroupName==""){
                        Ext.MessageBox.alert("任务组名不能为空!");
                        return;
                    }else{
                        Ext.Ajax.request({
                            url:"/taskGroup/decideGroupNameExist.do",
                            success:function(response,config){
                                if(response.responseText=="Y" && inputGroupName!=taskGroupName){
                                    Ext.MessageBox.alert("该任务组名已存在!");
                                    return;
                                }else{
                                    updateTaskGroup(taskGroupId,inputGroupName,inputGroupDesc,updateTaskGroupWindow);
                                }
                            },
                            failure:function(){
                                Ext.MessageBox.alert("result","服务器异常,请稍后尝试");
                                updateTaskGroupWindow.close();
                            },
                            params:{name:inputGroupName}
                        })
                    }
                }
            }
        ]})
    });
    updateTaskGroupWindow.show(taskGroupPanel);
}

//修改功能  访问后台进行修改
function updateTaskGroup(taskGroupId,inputGroupName,inputGroupDesc,updateTaskGroupWindow){
    Ext.Ajax.request({
        url:"/taskGroup/updateTaskGroup.do",
        success:function(response,config){
            Ext.MessageBox.alert("result","修改成功!");
            updateTaskGroupWindow.close();
            showTaskGroupPanel(Ext.getCmp("secondGuidePanel"));
        },
        failure:function(){
            Ext.MessageBox.alert("result","服务器异常,修改失败!请稍后尝试");
            updateTaskGroupWindow.close();
        },
        params:{id:taskGroupId,name:inputGroupName,desc:inputGroupDesc}
    })
}

//新增功能  填写任务组名和任务组描述的窗口
function addTaksGroupWindow(taskGroupPanel){
    //任务组名输入框
   var taskGroupName=new Ext.form.TextField({
        id:"taskGroupNameInput",
        name: "taskGroupNameInput",
        fieldLabel: "任务组名",
        width:150,
        value:""
    });
    //任务组描述输入框
    var taskGroupDesc=new Ext.form.TextArea({
        id:"taskGroupDescInput",
        name: "taskGroupDescInput",
        fieldLabel: "任务组描述",
        width:300,
        height:100,
        value:""
    });
    //表单
    var addTaskGroupForm=new Ext.form.FormPanel({
        id:"addTaskGroupForm",
        width:500,
        height:220,
        frame:true,
        labelWidth:130,
        labelAlign:"right",
        items:[
            {
                layout:"form",  //从上往下布局
                items:[taskGroupName,taskGroupDesc]
            }
        ]
    });
    var addTaskGroupWindow=new Ext.Window({
        id:"addTaskGroupWindow",
        title:"新增任务组",
        bodyStyle:"background-color:white",
        width:500,
        modal:true,
        height:220,
        items:[
            addTaskGroupForm
        ],
        tbar:new Ext.Toolbar({buttons:[
            {
                text:"下一步",
                handler:function(){
                    var inputGroupName=taskGroupName.getValue();
                    if(inputGroupName==undefined || inputGroupName==""){
                        Ext.MessageBox.alert("任务组名不能为空!");
                        return;
                    }else{
                        Ext.Ajax.request({
                            url:"/taskGroup/decideGroupNameExist.do",
                            success:function(response,config){
                                if(response.responseText=="Y"){
                                    Ext.MessageBox.alert("该任务组名已存在!");
                                }else{
                                    chooseTaskByTaskGroup(addTaskGroupWindow,taskGroupPanel);
                                }
                            },
                            failure:function(){
                                Ext.MessageBox.alert("result","服务器异常,请稍后尝试");
                                addTaskGroupWindow.close();
                            },
                            params:{name:inputGroupName}
                        })
                    }
                }
            }
        ]})
    });
    addTaskGroupWindow.show(taskGroupPanel);
}

//新增功能  选择任务的窗口(需要加入到任务组中的任务)
function chooseTaskByTaskGroup(addTaskGroupWindow,taskGroupPanel){
    //获取填写的任务组名和任务组描述 并且关闭窗口
    var inputTaskGroupName=Ext.getCmp("taskGroupNameInput").getValue();
    var inputTaskGroupDesc=Ext.getCmp("taskGroupDescInput").getValue();
    addTaskGroupWindow.close();
    //生成一个列表展现该用户下的所有作业和转换
    var allTaskPanel=showAllTaskForAdd();
    //打开一个新的窗口展现该列表
    var chooseTaskWindow=new Ext.Window({
        id:"chooseTaskWindow",
        title:"选择需要分配的任务",
        modal:true,
        bodyStyle:"background-color:white",
        width:600,
        height:520,
        items:[
            allTaskPanel
        ],
        tbar:new Ext.Toolbar({buttons:[
            {
                text:"提交",
                handler:function(){
                    var allTaskPanelForAdd=Ext.getCmp("allTaskPanelForAdd");
                    var taskArray=new Array();
                    var view=allTaskPanelForAdd.getView();
                    var rsm=allTaskPanelForAdd.getSelectionModel();
                    for(var i=0;i<view.getRows().length;i++) {
                        if(rsm.isSelected(i)){
                            var taskId=allTaskPanelForAdd.getStore().getAt(i).get("taskId");
                            var type=allTaskPanelForAdd.getStore().getAt(i).get("type");
                            var taskPath=allTaskPanelForAdd.getStore().getAt(i).get("taskPath");
                            var taskName=allTaskPanelForAdd.getStore().getAt(i).get("taskName");
                            var task=new TaskEntity(taskId,type,taskPath,taskName);
                            taskArray.push(task);
                        }
                    }
                    if(taskArray.length<1){
                        Ext.MessageBox.confirm("确认","确认不分配任务创建一个空任务组?",function(btn){
                            if(btn=="yes"){
                                Ext.Ajax.request({
                                    url:"/taskGroup/addTaskGroup.do",
                                    success:function(response,config){
                                        Ext.MessageBox.alert("提示","任务组创建成功!");
                                        chooseTaskWindow.close();
                                        showTaskGroupPanel(Ext.getCmp("secondGuidePanel"));
                                    },
                                    failure:function(){
                                        Ext.MessageBox.alert("result","任务组创建失败,请稍后尝试");
                                        chooseTaskWindow.close();
                                    },
                                    params:{taskGroupDesc:inputTaskGroupDesc,taskGroupName:inputTaskGroupName,flag:"N"}
                                })
                            }else{
                                return;
                            }
                        });
                    }else{
                        Ext.Ajax.request({
                            url:"/taskGroup/addTaskGroup.do",
                            success:function(response,config){
                                Ext.MessageBox.alert("提示","任务组创建成功!");
                                chooseTaskWindow.close();
                                showTaskGroupPanel(Ext.getCmp("secondGuidePanel"));
                            },
                            failure:function(){
                                Ext.MessageBox.alert("result","任务组创建失败,请稍后尝试");
                                chooseTaskWindow.close();
                            },
                            params:{taskGroupDesc:inputTaskGroupDesc,taskGroupName:inputTaskGroupName,taskArray:JSON.stringify(taskArray),flag:"Y"}
                        })
                    }
                }

            }
        ]})
    });
    chooseTaskWindow.show(taskGroupPanel);
}

//展示该用户下所有的任务   作业和转换
function showAllTaskForAdd(){
    var sm2=new Ext.grid.CheckboxSelectionModel();
    //节点列模型
    var allTaskPanelModel=new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),//行序号生成器,会为每一行生成一个行号
        sm2,
        {header:"任务ID",dataIndex:"taskId"},
        {header:"任务类型",dataIndex:"type"},
        {header:"任务名",dataIndex:"taskName"},
        {header:"任务全目录名",dataIndex:"taskPath"}
    ]);

    var proxy=new Ext.data.HttpProxy({url:"/taskGroup/getAllTaskBeforeAdd.do"});

    var allTaskRecord=Ext.data.Record.create([
        {name:"taskId",type:"string",mapping:"taskId"},
        {name:"type",type:"string",mapping:"type"},
        {name:"taskName",type:"string",mapping:"taskName"},
        {name:"taskPath",type:"string",mapping:"taskPath"}
    ])
    //totalProperty代表总条数 root代表当页的数据
    var reader=new Ext.data.JsonReader({},allTaskRecord);

    var store=new Ext.data.Store({
        proxy:proxy,
        reader:reader
    })
    store.load();

    var allTaskPanelForAdd=new Ext.grid.GridPanel({
        id:"allTaskPanelForAdd",
        width:595,
        height:500,
        cm:allTaskPanelModel,
        sm:sm2,
        store:store,
        closable:true,
        viewConfig : {
            forceFit : true //让grid的列自动填满grid的整个宽度，不用一列一列的设定宽度
        }
    });
    allTaskPanelForAdd.getColumnModel().setHidden(2,true);
    return allTaskPanelForAdd;
}

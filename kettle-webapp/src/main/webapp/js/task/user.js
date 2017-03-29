//展示用户信息
function showUserPanel(secondGuidePanel){
    //为表格添加一行复选框用于选择行
    var sm=new Ext.grid.CheckboxSelectionModel();
    //列模型
    var cm=new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),//行序号生成器,会为每一行生成一个行号
        sm,
        {header:"id",dataIndex:"userId"},
        {header:"password",dataIndex:"password"},
        {header:"描述",dataIndex:"description"},
        {header:"用户名",dataIndex:"login"},
        {header:"enabled",dataIndex:"enabled",menuDisabled:true,align:"center",
            renderer:function(v){
               if(v=="Y"){
                   return "是";
               }else{
                   return "否";
               }
            }
        },
        {header:"操作",width:280,dataIndex:"",menuDisabled:true,align:"center",
            renderer:function(v){
                return "<input type='button' onclick='deleteUser()' value='删除'>&nbsp;"+
                        "<input type='button' onclick='updateUser()' value='修改'>&nbsp;";
            }
        }
    ]);
    var proxy=new Ext.data.HttpProxy({url:"/user/getUsers.do"});
    //Record定义记录结果
    var human=Ext.data.Record.create([
        {name:"userId",type:"string",mapping:"userId"},
        {name:"password",type:"string",mapping:"password"},
        {name:"description",type:"string",mapping:"description"},
        {name:"login",type:"string",mapping:"login"},
        {name:"enabled",type:"string",mapping:"enabled"}
    ])
    var reader=new Ext.data.JsonReader({totalProperty:"totalProperty",root:"root"},human);

    var store=new Ext.data.Store({
        proxy:proxy,
        reader:reader
    })
    store.load({params:{start:0,limit:10}});
    var grid=new Ext.grid.GridPanel({
        id:"usersPanel",
        title:"用户管理",
        height:470,
        cm:cm,      //列模型
        sm:sm,
        store:store,
        viewConfig : {
            forceFit : true //让grid的列自动填满grid的整个宽度，不用一列一列的设定宽度
        },
        closable:true,
        tbar:new Ext.Toolbar({
            buttons:[
                {
                    text:"添加",
                    handler:function(){
                        addUser(secondGuidePanel,grid);
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
    secondGuidePanel.removeAll(true);
    secondGuidePanel.add(grid);
    secondGuidePanel.doLayout();
}

//修改用户
function updateUser(){
    var grid=Ext.getCmp("usersPanel");
    var secondGuidePanel=Ext.getCmp("secondGuidePanel");
    var login=grid.getSelectionModel().getSelected().get("login");
    var password=grid.getSelectionModel().getSelected().get("password");
    var description=grid.getSelectionModel().getSelected().get("description");
    var userId=grid.getSelectionModel().getSelected().get("userId");
    var updateForm=generateUserForm(login,description,password,"/user/updateUser.do");
    //生成修改窗口
    var updateUserWindow=new Ext.Window({
        id:"updateUserWindow",
        title:"修改用户",
        bodyStyle:"background-color:white",
        width:500,
        height:250,
        items:[
            updateForm
        ],
        tbar:new Ext.Toolbar({buttons:[
            {
                text:"提交",
                handler:function(){
                    //表单所有控件作为提交参数
                    var userIdHidden=new Ext.form.Hidden({
                        name:"userId",
                        value:userId
                    });
                    updateForm.items.add(userIdHidden);
                    updateForm.doLayout();
                    updateForm.baseParams=updateForm.getForm().getValues();
                    if(updateForm.getForm().isValid()){
                        updateForm.getForm().submit({
                            success:function(form,action){
                                Ext.MessageBox.alert("成功","修改用户成功!");
                                updateUserWindow.close();
                                showUserPanel(secondGuidePanel);
                            },
                            failure:function(){
                                Ext.MessageBox.alert("失败","服务器异常,请稍后再试!");
                            }
                        })
                    }else{
                        Ext.MessageBox.alert("提交失败","表单存在不规范填写,请再次确认后提交!");
                    }
                }
            }
        ]})
    });
    updateUserWindow.show(grid);
    Ext.getCmp("userLogin").disable();
}

//添加用户
function addUser(secondGuidePanel,grid){
    var addUserForm=generateUserForm("","","","/user/addUser.do");
    var addUserWindow=new Ext.Window({
        id:"addUserWindow",
        title:"新增用户",
        bodyStyle:"background-color:white",
        width:500,
        height:250,
        items:[
            addUserForm
        ],
        tbar:new Ext.Toolbar({buttons:[
            {
                text:"提交",
                handler:function(){
                    //表单所有控件作为提交参数
                    addUserForm.baseParams=addUserForm.getForm().getValues();
                    if(addUserForm.getForm().isValid()){
                        addUserForm.getForm().submit({
                            success:function(form,action){
                                if(action.result.isSuccess==true){
                                    Ext.MessageBox.alert("成功","添加用户成功!");
                                    addUserWindow.close();
                                    showUserPanel(secondGuidePanel);
                                }else{
                                    Ext.MessageBox.alert("失败","该用户名已存在!");
                                    Ext.getCmp("userLogin").setValue("");
                                }
                            },
                            failure:function(){
                                Ext.MessageBox.alert("失败","服务器异常,请稍后再试!");
                            }
                        })
                    }else{
                        Ext.MessageBox.alert("提交失败","表单存在不规范填写,请再次确认后提交!");
                    }
                }
            }
        ]})
    });
    addUserWindow.show(grid);
}

//生成添加/修改用户所需要的表单
function generateUserForm(login,description,password,uri){
    //登录名 login输入框
    var userLoginInput=new Ext.form.TextField({
        id:"userLogin",
        name: "userLogin",
        fieldLabel: "用户名",
        width:150,
        value:login,
        allowBlank:false
    });
    //用户描述
    var userDescriptionInput=new Ext.form.TextArea({
        id:"userDescription",
        name: "userDescription",
        fieldLabel: "备注",
        width:300,
        height:100,
        value:description
    });
    var passwordInput=new Ext.form.TextField({
        id:"userPassword",
        name: "userPassword",
        fieldLabel: "密码",
        width:150,
        allowBlank:false,
        value:password,
        regex:/^[a-zA-Z0-9]{6,10}$/,
        invalidText:"密码必须在6-10字符",
        validateOnBlur:true
    });
    //表单
    var userInfoForm=new Ext.form.FormPanel({
        url:uri,
        id:"userInfoForm",
        width:500,
        height:220,
        frame:true,
        labelWidth:130,
        labelAlign:"right",
        items:[
            {
                layout:"form",  //从上往下布局
                items:[userLoginInput,userDescriptionInput,passwordInput]
            }
        ]
    });
    return userInfoForm;
}

function deleteUser(){
    var grid=Ext.getCmp("usersPanel");
    var secondGuidePanel=Ext.getCmp("secondGuidePanel");
    var userId=grid.getSelectionModel().getSelected().get("userId");
    Ext.MessageBox.confirm("确认","确认删除该用户?",function(btn){
        if(btn=="yes"){
            Ext.Ajax.request({
                url:"/user/deleteUser.do",
                success:function(response,config){
                    showUserPanel(secondGuidePanel);
                    Ext.MessageBox.alert("删除用户成功!");
                },
                failure:function(){
                    Ext.MessageBox.alert("删除失败,请稍后尝试!");
                },
                params:{userId:userId}
            })
        }else{
            return;
        }
    })
}
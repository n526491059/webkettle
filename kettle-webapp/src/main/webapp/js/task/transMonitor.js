//转换
function generateTrans(transName,createDate,inputName){
    var secondGuidePanel=Ext.getCmp("secondGuidePanel");
    //为表格添加一行复选框用于选择需要删除的记录
    var sm=new Ext.grid.CheckboxSelectionModel();
    //列模型
    var cm=new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),//行序号生成器,会为每一行生成一个行号
        sm,
        {header:"转换ID",width:30,dataIndex:"transformationId"},
        {header:"所在目录",width:150,dataIndex:"directoryName"},
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
    store.load({params:{start:0,limit:5,name:transName,date:createDate}});


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
                    text:"删除所选行",
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
                            Ext.MessageBox.confirm("确认","确认删除所选行?",function(btn){
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
                },"-",
                {
                    text:"删除所有行",
                    handler:function(){
                        Ext.MessageBox.confirm("确认","确认删除所有行?",function(btn){
                            if(btn=="yes"){
                                var view=grid.getView();
                                var pathArray=new Array();
                                for(var i= 0;i<view.getRows().length;i++){
                                    pathArray.push(grid.getStore().getAt(i).get("transformationId"));
                                }
                                Ext.Ajax.request({
                                    url:"/task/delete.do",
                                    success:function(response,config){
                                        secondGuidePanel.removeAll(true);
                                        secondGuidePanel.add(generateTrans("","",undefined));
                                        secondGuidePanel.doLayout();
                                        Ext.MessageBox.alert("提示","删除记录成功~!")
                                    },
                                    failure:function(){
                                        Ext.MessageBox.alert("result","内部错误,删除失败!")
                                    },
                                    params:{path:pathArray,flag:"transformation"}
                                })
                            }
                        })
                    }
                }
            ]
        }),
        bbar:new Ext.PagingToolbar({
            store:store,
            pageSize:5,
            displayInfo:true,
            displayMsg:"本页显示第{0}条到第{1}条的记录,一共{2}条",
            emptyMsg:"没有记录"
        })
    });
    grid.getColumnModel().setHidden(2,true);
    //grid.getColumnModel().setHidden(3,true);
    return grid;
}
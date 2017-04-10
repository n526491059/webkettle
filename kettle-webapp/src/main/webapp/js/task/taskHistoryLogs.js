
function showHistoryLogPanel(secondGuidePanel){

    //为表格添加一行复选框用于选择行
    var sm=new Ext.grid.CheckboxSelectionModel();

    //列模型
    var cm=new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),//行序号生成器,会为每一行生成一个行号
        sm,
        {header:"id",dataIndex:"fireId"},
        {header:"任务名",dataIndex:"jobName"},
        {header:"开始时间",dataIndex:"startTime",format:"y-M-d H:m:s"},
        {header:"结束时间",dataIndex:"endTime",format:"y-M-d H:m:s"},
        {header:"执行方式",dataIndex:"execMethod"},
        {header:"状态",dataIndex:"status",align:"center"},
        {header:"参数信息",dataIndex:"executionConfiguration",
            renderer:function(v){
                return "exec_lo..."+
                    "<input type='button' onclick='showConfigInfo()' value='view'>&nbsp;";
            }
        },
        {header:"日志详情",dataIndex:"executionLog",
            renderer:function(v){
                return "finis..."+
                    "<input type='button' onclick='showLogInfo()' value='view'>&nbsp;";
            }
        },

    ]);

    //准备数据 使用HttpProxy方式从后台获取json格式的数据
    var proxy=new Ext.data.HttpProxy({url:"/log/getAllHistoryLog.do"});

    //Record定义记录结果
    var human=Ext.data.Record.create([
        {name:"fireId",type:"string",mapping:"fireId"},
        {name:"jobName",type:"string",mapping:"jobName"},
        {name:"startTime",type:"string",mapping:"startTime"},
        {name:"endTime",type:"string",mapping:"endTime"},
        {name:"execMethod",type:"string",mapping:"execMethod"},
        {name:"status",type:"string",mapping:"status"},
        {name:"executionConfiguration",type:"string",mapping:"executionConfiguration"},
        {name:"executionLog",type:"string",mapping:"executionLog"}
    ])
    var reader=new Ext.data.JsonReader({totalProperty:"totalProperty",root:"root"},human);

    var store=new Ext.data.Store({
        proxy:proxy,
        reader:reader
    })
    store.load({params:{start:0,limit:15}});

    var grid=new Ext.grid.GridPanel({
        id:"historyLogPanel",
        title:"历史日志",
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
                    text:"定时执行",
                    handler:function(){

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
    secondGuidePanel.removeAll(true);
    secondGuidePanel.add(grid);
    secondGuidePanel.doLayout();
}

function showLogInfo(){
    var historyLogPanel=Ext.getCmp("historyLogPanel");
    var id=historyLogPanel.getSelectionModel().getSelected().get("fireId");
    Ext.Ajax.request({
        url:"/log/getTraceById.do",
        success:function(response,config){
            var trace=response.responseText;
            var executionLog=Ext.decode(trace).executionLog
            var logJSON=eval("("+executionLog+")");
            var windowHTML="";
            for(var item in logJSON){
                if(item=="jobMeasure"){
                    var array=logJSON[item];
                    var twoInfo="";
                    for(var i=0;i<array.length;i++){
                        var attr=array[i];
                        for(var item2 in attr){
                            if(item2=="children"){
                                var array2=attr[item2];
                                var threeInfo="";
                                for(var i=0;i<array2.length;i++){
                                    var attr2=array2[i];
                                    for(var item3 in attr2){
                                        threeInfo+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+item3+":"+attr2[item3]+"<br/>"
                                    }
                                    if(i!=array2.length-1){
                                        threeInfo+="<br/>";
                                    }
                                }
                                twoInfo+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+item2+"<br/>"+threeInfo;
                            }else{
                                twoInfo+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+item2+":"+attr[item2]+"<br/>";
                            }
                        }
                    }
                    windowHTML+=item+"<br/>"+twoInfo+"<br/>"
                }else if(item=="stepMeasure"){
                    var array=logJSON[item];
                    var twoInfo="";
                    for(var i=0;i<array.length;i++){
                        var array2=array[i];
                        twoInfo+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                        for(var j=0;j<array2.length;j++){
                            twoInfo+=array2[j]+"&nbsp;&nbsp;";
                        }
                        twoInfo+="<br/>";
                    }
                    windowHTML+=item+"<br/>"+twoInfo+"<br/>"
                }else{
                    windowHTML+=item+":"+"<br/>"+logJSON[item]+"<br/><br/>";
                }
            }
            var logDetailWindow=new Ext.Window({
                title:"日志详情",
                width:500,
                height:520,
                autoScroll: true,
                id:"logDetailWindow",
                html:windowHTML,
                bodyStyle:"background-color:white",
                modal:true
            });
            logDetailWindow.show(historyLogPanel);
        },
        failure:function(){
            Ext.MessageBox.alert("result","内部错误,请稍后再试");
        },
        params:{id:id}
    });

}

function showConfigInfo(){
    var historyLogPanel=Ext.getCmp("historyLogPanel");
    var id=historyLogPanel.getSelectionModel().getSelected().get("fireId");
    Ext.Ajax.request({
        url:"/log/getTraceById.do",
        success:function(response,config){
            var trace=response.responseText;
            var executionConfiguration=Ext.decode(trace).executionConfiguration;
            var configJSON=eval("("+executionConfiguration+")");
            var windowHTML="";
            for(var item in configJSON){
                if(item=="slaveserver" || item=="variables"){
                    var array=configJSON[item];
                    var twoInfo="";
                    for(var i=0;i<array.length;i++){
                        var attr=array[i];
                        for(var item2 in attr){
                            twoInfo+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+item2+":"+attr[item2]+"<br/>"
                        }
                    }
                    windowHTML+=item+"<br/>"+twoInfo+"<br/>";
                }else{
                    windowHTML+=item+":"+"<br/>"+configJSON[item]+"<br/><br/>";
                }
            }
            var configDetailWindow=new Ext.Window({
                title:"参数详情",
                width:500,
                height:520,
                autoScroll: true,
                id:"configDetailWindow",
                html:windowHTML,
                bodyStyle:"background-color:white",
                modal:true
            });
            configDetailWindow.show(historyLogPanel);
        },
        failure:function(){
            Ext.MessageBox.alert("result","内部错误,请稍后再试");
        },
        params:{id:id}
    });


}
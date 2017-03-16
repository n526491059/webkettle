//生成执行功能弹窗
function generateSlaveWindow(path,flag2){
    var executeWindow=new Ext.Window({
        title:"执行窗口",
        width:600,
        height:310,
        id:"executeWindow"
    })
    var tbar= new Ext.Toolbar({
        buttons:[
            {
                text:"取消",
                handler:function(){
                    executeWindow.close();
                }

            },"-",
            {
                text:"确认执行",
                handler:function(){
                    var resultArrya=ifSlaveChoose();
                    if(resultArrya[0]==0){
                        Ext.MessageBox.alert("提示","请至少选择一个正常节点再执行转换!");
                        return;
                    }else if(resultArrya[0]>1){
                        Ext.MessageBox.alert("提示","只能选中一个节点进行运行");
                        return;
                    }else if(resultArrya[0]==-1){
                        Ext.MessageBox.alert("提示","该节点异常,请重新选择!");
                        return;
                    }else if(resultArrya[0]==1){
                        Ext.Ajax.request({
                            url:"/task/execute.do",
                            success:function(response,config){
                                Ext.MessageBox.alert("result","已执行");
                                setTimeout("closeWindwo()",1500);
                            },
                            failure:function(){
                                Ext.MessageBox.alert("result","内部错误,执行失败!")
                            },
                            params:{path:path,slaveId:resultArrya[1],flag:flag2}
                        })
                    }
                }
            }
        ]
    })
    //给节点列表添加功能按钮
    var slaveGridPanel=getSlaveGridPanel(300,tbar);
    //把展示节点的panel追加窗口中
    executeWindow.add(slaveGridPanel);
    return executeWindow;
}

//获得节点的列表panel
function getSlaveGridPanel(h,tbar){
    if(tbar==""){
        tbar=new Ext.Toolbar({
            buttons:[
            ]
        })
    }

    var sm2=new Ext.grid.CheckboxSelectionModel();
    //节点列模型
    var slaveModel=new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),//行序号生成器,会为每一行生成一个行号
        sm2,
        {header:"ID",width:55,dataIndex:"slaveId"},
        {header:"主机名",width:140,dataIndex:"hostName"},
        {header:"端口",width:90,dataIndex:"port"},
        {header:"负载指数",width:90,dataIndex:"loadAvg",tooltip:"这是负载指数"},
        {header:"状态",width:200,dataIndex:"status",align:"center"}
    ]);

    var proxy=new Ext.data.HttpProxy({url:"/slave/getSlave.do"});

    var slaveRecord=Ext.data.Record.create([
        {name:"slaveId",type:"string",mapping:"slaveId"},
        {name:"hostName",type:"string",mapping:"hostName"},
        {name:"port",type:"string",mapping:"port"},
        {name:"loadAvg",type:"string",mapping:"loadAvg"},
        {name:"status",type:"string",mapping:"status"}
    ])
    var reader=new Ext.data.JsonReader({},slaveRecord);

    var store=new Ext.data.Store({
        proxy:proxy,
        reader:reader
    })
    store.load();

    var slaveGridPanel=new Ext.grid.GridPanel({
        id:"slaveGridPanel",
        title:"选择节点",
        width:590,
        height:h,
        cm:slaveModel,      //列模型
        sm:sm2,      //行选择框
        store:store,    //数据源
        closable:true,
        tbar:tbar
    })
    return slaveGridPanel;
}

//判断用户是否选中了正常节点
function ifSlaveChoose(){
    var slaveGridPanel=Ext.getCmp("slaveGridPanel");
    var view=slaveGridPanel.getView();
    var rsm=slaveGridPanel.getSelectionModel();
    var flag=false;
    var j=0;
    var slaveId="";     //节点id
    var status="";      //节点状态
    var result=new Array();     //返回的结果 数组中第一个将会存放用户选择的节点数,0代表没有选择节点 -1代表选择了不正常节点
                                //如果刚好选择了一个正常节点,则会把节点ID存放在数组的第二个位置
    //遍历所有行
    for(var i= 0;i<view.getRows().length;i++){
        //判断是否被选中，参数i代表行号
        if(rsm.isSelected(i)){
            status=slaveGridPanel.getStore().getAt(i).get("status");
            slaveId=slaveGridPanel.getStore().getAt(i).get("slaveId");
            flag=true;
            j++;
        }
    }
    if(flag==false){
        result.push(0);
    }else if(flag==true && j>1){
        result.push(j);
        return;
    }else if(flag==true && j==1){
        if(status=="<font color='green'>节点正常</font>"){
            result.push(1);
            result.push(slaveId);
        }else{
            result.push(-1);
        }
    }
    return result;
}

function slaveManager(){
    var tbar=new Ext.Toolbar({
        buttons: [
            {
                text: "新增",
                handler: function () {

                }
            }, "-",
            {
               text:"修改",
                handler:function(){

                }
            }
        ]
    });
    var slavePanel=getSlaveGridPanel(500,tbar);
    return slavePanel;
}


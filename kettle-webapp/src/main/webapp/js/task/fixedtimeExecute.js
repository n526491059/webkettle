//生成日期(1号-30号)的下拉选择框
function generateDayChooseByMonth(){
    //下拉列表智能执行的数据来源  暂时支持4种定时
    var monthData=[
        [1,"1号"],
        [2,"2号"],
        [3,"3号"],
        [4,"4号"],
        [5,"5号"],
        [6,"6号"],
        [7,"7号"],
        [8,"8号"],
        [9,"9号"],
        [10,"10号"],
        [11,"11号"],
        [12,"12号"],
        [13,"13号"],
        [14,"14号"],
        [15,"15号"],
        [16,"16号"],
        [17,"17号"],
        [18,"18号"],
        [19,"19号"],
        [20,"20号"],
        [21,"21号"],
        [22,"22号"],
        [23,"23号"],
        [24,"24号"],
        [25,"25号"],
        [26,"26号"],
        [27,"27号"],
        [28,"28号"],
        [29,"29号"],
        [30,"30号"]
    ]
    var monthProxy=new Ext.data.MemoryProxy(monthData);

    //下拉列表的数据结构
    var monthRecord=Ext.data.Record.create([
        {name:"dayId",type:"string",mapping:0},    //此列为下拉列表的实际获得值
        {name:"dayName",type:"string",mapping:1}   //此列为下拉列表的显示值
    ])
    var monthReader=new Ext.data.ArrayReader({},monthRecord);

    var store=new Ext.data.Store({
        proxy:monthProxy,
        reader:monthReader,
        autoLoad:true
    });
    var monthChoose=new Ext.form.ComboBox({
        name:"monthChoose",
        id:"monthChoose",
        triggerAction:"all",
        store:store,
        displayField:"dayName",
        valueField:"dayId",
        mode:"local",
        emptyText:"请选择日期"
    })
    return monthChoose;
}

//生成周一到周日的下拉选择框
function generateDayChooseByWeek(){
    //下拉列表智能执行的数据来源  暂时支持4种定时
    var weekData=[
        [1,"周一"],
        [2,"周二"],
        [3,"周三"],
        [4,"周四"],
        [5,"周五"],
        [6,"周六"],
        [7,"周日"]
    ]
    var weekProxy=new Ext.data.MemoryProxy(weekData);

    //下拉列表的数据结构
    var weekRecord=Ext.data.Record.create([
        {name:"weekId",type:"string",mapping:0},    //此列为下拉列表的实际获得值
        {name:"weekName",type:"string",mapping:1}   //此列为下拉列表的显示值
    ])
    var weekRecord=new Ext.data.ArrayReader({},weekRecord);

    var store=new Ext.data.Store({
        proxy:weekProxy,
        reader:weekRecord,
        autoLoad:true
    });
    var weekChoose=new Ext.form.ComboBox({
        id:"weekChoose",
        name:"weekChoose",
        triggerAction:"all",
        store:store,
        displayField:"weekName",
        valueField:"weekId",
        mode:"local",
        emptyText:"请选择时间"
    })
    return weekChoose;
}

//生成定时执行的窗口
function fixedExecuteWindow(){
     var chooseForm=generateDateForm(new Array());

    //定时执行时需要的功能按钮
    var tbar= new Ext.Toolbar({
        buttons:[
            {
                text:"取消",
                handler:function(){
                    fiexdWindow.close();
                }
            },"-",
            {
                text:"加入定时任务",
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
                        var targetForm=Ext.getCmp("fiexdForm");
                        //获取被选中作业的作业名 作业id 作业全目录名
                        var jobInfo=getJobInfo();
                        var jobIdHidden=new Ext.form.Hidden({
                            name: "jobId",
                            value:jobInfo[0]
                        });
                        var jobNameHidden=new Ext.form.Hidden({
                            name: "jobName",
                            value:jobInfo[1]
                        });
                        var jobPathHidden=new Ext.form.Hidden({
                            name: "jobPath",
                            value:jobInfo[2]
                        });

                        //获取被选中的节点id
                        var slaveHidden=new Ext.form.Hidden({
                            name: "slaveId",
                            value:resultArrya[1]
                        });
                        //把节点ID、作业Id、作业name、作业全目录名以隐藏域的形式加入到表单中
                        targetForm.items.add(slaveHidden);
                        targetForm.items.add(jobIdHidden);
                        targetForm.items.add(jobNameHidden);
                        targetForm.items.add(jobPathHidden);
                        targetForm.doLayout();
                        //表单中所有表单控件作为请求参数
                        targetForm.baseParams=targetForm.getForm().getValues();
                        if(targetForm.getForm().isValid()){
                            targetForm.getForm().submit({
                                success:function(form,action){
                                    if(action.result.isSuccess==false){
                                        Ext.MessageBox.alert("失败","该作业已经存在相同执行周期的调度计划");
                                    }else{
                                        Ext.MessageBox.alert("成功","已加入定时调度!");
                                        var thisWindow=Ext.getCmp("fiexdWindow");
                                        thisWindow.close();
                                    }
                                },
                                failure:function(){
                                    Ext.MessageBox.alert("异常","服务器异常,请稍后再试!");
                                }
                            })
                        }else{
                            Ext.MessageBox.alert("失败","表单存在不规范填写,请再次确认后提交!");
                        }

                    }
                }
            }
        ]
    })
    //获得节点展示列表
    var slavePanel=getSlaveGridPanel(tbar,150);

    var fiexdWindow=new Ext.Window({
        id:"fiexdWindow",
        title:"定时窗口",
        width:620,
        height:450,
        id:"fiexdWindow",
        items:[slavePanel,chooseForm]
    });


    return fiexdWindow;
}

//生成定时执行时收集定时参数的表单
function generateDateForm(array){
    var chooseCombox=getExecuteTypeCombox();
    array.push(chooseCombox);
    fiexdForm=new Ext.form.FormPanel({
        url:"/task/fiexdExecute.do",
        title:"定时选择",
        id:"fiexdForm",
        width:600,
        height:250,
        frame:true,
        labelWidth:130,
        labelAlign:"right",
        items:array
    });
    return fiexdForm;
}

//获得定时执行时候需要的下拉框(可选择定时执行的类型)
function getExecuteTypeCombox(){
    //下拉列表智能执行的数据来源  暂时支持4种定时
    var typeData=[
        ["1","间隔执行"],
        ["2","每天执行"],
        ["3","每周执行"],
        ["4","每月执行"]
    ]
    var typeProxy=new Ext.data.MemoryProxy(typeData);

    //下拉列表的数据结构
    var typeRecord=Ext.data.Record.create([
        {name:"typeId",type:"string",mapping:0},    //此列为下拉列表的实际获得值
        {name:"typeName",type:"string",mapping:1}   //此列为下拉列表的显示值
    ])
    var typeReader=new Ext.data.ArrayReader({},typeRecord);

    var store=new Ext.data.Store({
        proxy:typeProxy,
        reader:typeReader,
        autoLoad:true
    })

    var typeChoose=new Ext.form.ComboBox({
        id:"typeChoose",
        name:"typeChoose",
        triggerAction:"all",
        store:store,
        autoLoad:true,
        displayField:"typeName",
        valueField:"typeId",
        mode:"local",
        emptyText:"请选择定时执行的方式",
        listeners:{
            //index是被选中的下拉项在整个列表中的下标 从0开始
            'select':function(combo,record,index){
                var formArray=new Array();
                var parWindow=Ext.getCmp("fiexdWindow");
                var chooseId="";
                switch(index)
                {
                    case 0:
                        //按指定的时间间隔执行
                        var intervalTime=new Ext.form.TextField({
                            name: "intervalminute",
                            fieldLabel: "时间间隔(单位/分钟)",
                            width:50,
                            value:0,
                            regex:/^(^[1-9]$)|(^[1-5][0-9]$)$/,
                            invalidText:"循环执行的时间间隔,有效值1-59",
                            validateOnBlur:true
                        })
                        formArray.push(intervalTime);
                        chooseId="1";
                        break;
                    case 1:
                        //每天的某个时间执行
                        var hourByDay=new Ext.form.TextField({
                            name: "hour",
                            fieldLabel: "时",
                            width:50,
                            value:0,
                            regex:/^(([0-9]{0,1})|(1[0-9])|(2[0-3]))$/,
                            invalidText:"时间的小时部分,24小时制,有效值为0-23",
                            validateOnBlur:true
                        });
                        var minuteByDay=new Ext.form.TextField({
                            name: "minute",
                            fieldLabel:"分",
                            width:50,
                            value:0,
                            regex:/^[1-5]?[0-9]$/,
                            invalidText:"时间的分钟部分,有效值为0-59",
                            validateOnBlur:true
                        });
                        formArray.push(hourByDay);
                        formArray.push(minuteByDay);
                        chooseId="2";
                        break;
                    case 2:     //每周的某个星期X执行(例如每周三13:00执行)
                        var dayByWeek=generateDayChooseByWeek();
                        var hourByWeek=new Ext.form.TextField({
                            name: "hour",
                            fieldLabel: "时",
                            width:50,
                            value:0,
                            regex:/^(([0-9]{0,1})|(1[0-9])|(2[0-3]))$/,
                            invalidText:"时间的小时部分,24小时制,有效值为0-23",
                            validateOnBlur:true
                        })
                        var minuteByWeek=new Ext.form.TextField({
                            name: "minute",
                            fieldLabel: "分",
                            width:50,
                            value:0,
                            regex:/^[1-5]?[0-9]$/,
                            invalidText:"时间的分钟部分,有效值为0-59",
                            validateOnBlur:true
                        })
                        formArray.push(hourByWeek);
                        formArray.push(minuteByWeek);
                        formArray.push(dayByWeek);
                        chooseId="3";
                        break;
                    case 3:
                        //每月的某一天某个时间执行(例如每个月的21号13:00执行)
                        var hourByMonth=new Ext.form.TextField({
                            name: "hour",
                            fieldLabel: "时",
                            width:50,
                            value:0,
                            regex:/^(([0-9]{0,1})|(1[0-9])|(2[0-3]))$/,
                            invalidText:"时间的小时部分,24小时制,有效值为0-23",
                            validateOnBlur:true
                        })
                        var minuteByMonth=new Ext.form.TextField({
                            name: "minute",
                            fieldLabel: "分",
                            width:50,
                            value:0,
                            regex:/^[1-5]?[0-9]$/,
                            invalidText:"时间的分钟部分,有效值为0-59",
                            validateOnBlur:true
                        })
                        var dayByMonth=generateDayChooseByMonth();
                        formArray.push(hourByMonth);
                        formArray.push(minuteByMonth);
                        formArray.push(dayByMonth);
                        chooseId="4";
                        break;
                    default:
                        return;
                }
                parWindow.remove("fiexdForm");
                var dateForm=generateDateForm(formArray,chooseId);
                parWindow.items.add(dateForm);
                parWindow.hide();
                 parWindow.show(Ext.getCmp("JobPanel"));
                //给表单的输入框添加验证提示
                //generateQtip();
                //给定时类型下拉框赋予用户选择的值
                var typeChoose=Ext.getCmp("typeChoose");
                if(chooseId==1){
                    typeChoose.setValue("1");
                    typeChoose.setRawValue("间隔执行");
                }else if(chooseId==2){
                    typeChoose.setValue("2");
                    typeChoose.setRawValue("每天执行");
                }else if(chooseId==3){
                    typeChoose.setValue("3");
                    typeChoose.setRawValue("每周执行");
                }else if(chooseId==4){
                    typeChoose.setValue("4");
                    typeChoose.setRawValue("每月执行");
                }
            }
        }
    });
    return typeChoose;
}


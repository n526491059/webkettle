package org.sxdata.jingwei.controller;

import org.flhy.ext.utils.JSONArray;
import org.flhy.ext.utils.JSONObject;
import org.flhy.ext.utils.JsonUtils;
import org.pentaho.di.trans.steps.systemdata.SystemDataTypes;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

/**
 * Created by pengpai on 2017/1/18 0018.
 */
@Controller
@RequestMapping(value="/task")
public class TaskController {
    @ResponseBody
    @RequestMapping(method= RequestMethod.POST, value="/getJobs")
    protected void getJobs() throws IOException {
        JSONArray jsonArray = new JSONArray();

//        SystemDataTypes[] values = SystemDataTypes.values();
//        for (SystemDataTypes value : values) {
//            JSONObject jsonObject = new JSONObject();
//            jsonObject.put("code", value.getCode());
//            jsonObject.put("descrp", value.getDescription());
//            jsonArray.add(jsonObject);
//        }
        System.out.println("xxxx");
        JsonUtils.response(jsonArray);
    }

    @ResponseBody
    @RequestMapping(method=RequestMethod.POST, value="/getTrans")
    protected void getTrans() throws IOException {
        JSONArray jsonArray = new JSONArray();



        JsonUtils.response(jsonArray);
    }
}

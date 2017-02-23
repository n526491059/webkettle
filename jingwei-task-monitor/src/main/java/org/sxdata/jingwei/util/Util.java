package org.sxdata.jingwei.util;

import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by cRAZY on 2017/2/22.
 *
 */
public class Util {
    //为json-lib日期返回正常的中的指定格式
    public static JsonConfig configJson(String datePattern){
        JsonConfig  config=new JsonConfig();
        config.setExcludes(new String[]{""});
        config.setIgnoreDefaultExcludes(false);
        config.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
        config.registerJsonValueProcessor(Date.class,new JsonDateValueProcessor(datePattern));
        return config;
    }

    //判断字符串不是空
    public static boolean isEmpty(String source){
        if (source==null || source.trim().equals("")){
            return true;
        }
        return false;
    }

    //字符串按照指定格式转换为日期
    public static Date stringToDate(String source,String pattern) throws Exception{
        SimpleDateFormat simple=new SimpleDateFormat(pattern);
        return simple.parse(source);
    }

    //日期按照指定格式转换为字符串
    public static String dateToString(String source,String pattern) throws Exception{
        SimpleDateFormat simple=new SimpleDateFormat(pattern);
        return simple.format(source);
    }
}

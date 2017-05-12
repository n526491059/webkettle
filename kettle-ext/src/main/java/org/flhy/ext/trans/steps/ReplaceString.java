package org.flhy.ext.trans.steps;

import com.mxgraph.model.mxCell;
import com.mxgraph.util.mxUtils;
import org.flhy.ext.core.PropsUI;
import org.flhy.ext.trans.step.AbstractStep;
import org.flhy.ext.utils.JSONArray;
import org.flhy.ext.utils.JSONObject;
import org.pentaho.di.core.Const;
import org.pentaho.di.core.database.DatabaseMeta;
import org.pentaho.di.trans.step.StepMetaInterface;
import org.pentaho.di.trans.steps.replacestring.ReplaceStringMeta;
import org.pentaho.metastore.api.IMetaStore;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.util.List;

/**
 * Created by pengpai on 2017/5/10.
 */
@Component("ReplaceString")
@Scope("prototype")
public class ReplaceString  extends AbstractStep {
    @Override
    public void decode(StepMetaInterface stepMetaInterface, mxCell cell, List<DatabaseMeta> databases, IMetaStore metaStore) throws Exception {
        ReplaceStringMeta replaceStringMeta = (ReplaceStringMeta) stepMetaInterface;
        String fields = cell.getAttribute("fields");
        JSONArray jsonArray = JSONArray.fromObject(fields);
        String[] fieldInStream = new String[jsonArray.size()];
        String[] fieldOutStream = new String[jsonArray.size()];
        int[] useRegEx = new int[jsonArray.size()];
        String[] replaceString = new String[jsonArray.size()];
        String[] replaceByString = new String[jsonArray.size()];
        boolean[] setEmptyString = new boolean[jsonArray.size()];
        String[] replaceFieldByString = new String[jsonArray.size()];
        int[] wholeWord = new int[jsonArray.size()];
        int[] caseSensitive = new int[jsonArray.size()];
        for(int i=0; i<jsonArray.size(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            fieldInStream[i] = jsonObject.optString("in_stream_name");
            fieldOutStream[i] = jsonObject.optString("out_stream_name");
            useRegEx[i]= Integer.parseInt(jsonObject.optString("use_regex"));
            replaceString[i] = jsonObject.optString("replace_string");
            replaceByString[i] = jsonObject.optString("replace_by_string");
            String emptyString = jsonObject.optString("set_empty_string");
            setEmptyString[i] = !Const.isEmpty(emptyString) && "Y".equalsIgnoreCase(emptyString);
            replaceFieldByString[i] =jsonObject.optString("replace_field_by_string");
            wholeWord[i] = Integer.parseInt(jsonObject.optString("whole_word"));
            caseSensitive[i] = Integer.parseInt(jsonObject.optString("case_sensitive"));
        }
        replaceStringMeta.setFieldInStream(fieldInStream);
        replaceStringMeta.setFieldOutStream(fieldOutStream);
        replaceStringMeta.setUseRegEx(useRegEx);
        replaceStringMeta.setReplaceString(replaceString);
        replaceStringMeta.setReplaceByString(replaceByString);
        replaceStringMeta.setEmptyString(setEmptyString);
        replaceStringMeta.setReplaceByString(replaceFieldByString);
        replaceStringMeta.setWholeWord(wholeWord);
        replaceStringMeta.setCaseSensitive(caseSensitive);
    }

    @Override
    public Element encode(StepMetaInterface stepMetaInterface) throws Exception {
        Document doc = mxUtils.createDocument();
        Element e = doc.createElement(PropsUI.TRANS_STEP_NAME);
        ReplaceStringMeta replaceStringMeta = (ReplaceStringMeta) stepMetaInterface;
        JSONArray jsonArray = new JSONArray();
        String[] fieldInStream = replaceStringMeta.getFieldInStream();
        String[] fieldOutStream = replaceStringMeta.getFieldOutStream();
        int[] useRegEx = replaceStringMeta.getUseRegEx();
        String[] replaceString = replaceStringMeta.getReplaceString();
        String[] replaceByString = replaceStringMeta.getReplaceByString();
        boolean[] setEmptyString = replaceStringMeta.isSetEmptyString();
        String[] replaceFieldByString = replaceStringMeta.getReplaceByString();
        int[] wholeWord = replaceStringMeta.getWholeWord();
        int[] caseSensitive = replaceStringMeta.getCaseSensitive();
        for (int i = 0; i < fieldInStream.length; i++) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("in_stream_name", fieldInStream[i]);
            jsonObject.put("out_stream_name", fieldOutStream[i]);
            jsonObject.put("use_regex", useRegEx[i]);
            jsonObject.put("replace_string", replaceString[i]);
            jsonObject.put("replace_by_string", replaceByString[i]);
            jsonObject.put("set_empty_string", setEmptyString[i]);
            jsonObject.put("replace_field_by_string", replaceFieldByString[i]);
            jsonObject.put("whole_word", wholeWord[i]);
            jsonObject.put("case_sensitive", caseSensitive[i]);
            jsonArray.add(jsonObject);
        }
        e.setAttribute("fields", jsonArray.toString());
        return e;
    }
}

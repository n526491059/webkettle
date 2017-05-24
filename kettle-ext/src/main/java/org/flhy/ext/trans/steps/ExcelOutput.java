package org.flhy.ext.trans.steps;

import com.mxgraph.model.mxCell;
import com.mxgraph.util.mxUtils;
import org.flhy.ext.core.PropsUI;
import org.flhy.ext.trans.step.AbstractStep;
import org.flhy.ext.utils.JSONArray;
import org.flhy.ext.utils.JSONObject;
import org.pentaho.di.core.database.DatabaseMeta;
import org.pentaho.di.core.encryption.Encr;
import org.pentaho.di.trans.step.StepMetaInterface;
import org.pentaho.di.trans.steps.exceloutput.ExcelField;
import org.pentaho.di.trans.steps.exceloutput.ExcelOutputMeta;
import org.pentaho.metastore.api.IMetaStore;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.util.List;

/**
 * Created by cRAZY on 2017/5/24.
 */
@Component("ExcelOutput")
@Scope("prototype")
public class ExcelOutput extends AbstractStep{
    @Override
    public void decode(StepMetaInterface stepMetaInterface, mxCell cell, List<DatabaseMeta> databases, IMetaStore metaStore) throws Exception {
        ExcelOutputMeta excel=(ExcelOutputMeta)stepMetaInterface;
        excel.setHeaderEnabled(cell.getAttribute("header").equalsIgnoreCase("Y"));
        excel.setFooterEnabled(cell.getAttribute("footer").equalsIgnoreCase("Y"));
        excel.setEncoding(cell.getAttribute("encoding"));
        excel.setAppend(cell.getAttribute("append").equalsIgnoreCase("Y"));
    }

    @Override
    public Element encode(StepMetaInterface stepMetaInterface) throws Exception {
        ExcelOutputMeta excel=(ExcelOutputMeta)stepMetaInterface;
        Document doc = mxUtils.createDocument();
        Element e = doc.createElement(PropsUI.TRANS_STEP_NAME);

        e.setAttribute("header", excel.isHeaderEnabled() ? "Y" : "N");
        e.setAttribute("footer", excel.isFooterEnabled() ? "Y" : "N");
        e.setAttribute("encoding", excel.getEncoding());
        e.setAttribute("append", excel.isAppend() ? "Y" : "N");
        e.setAttribute("add_to_result_filenames", excel.isAddToResultFiles() ? "Y" : "N");

        JSONObject jsonObj = new JSONObject();
        jsonObj.put("name", excel.getFileName());
        jsonObj.put("extention", excel.getExtension());
        jsonObj.put("do_not_open_newfile_init", excel.isDoNotOpenNewFileInit() ? "Y" : "N");
        jsonObj.put("create_parent_folder", excel.isCreateParentFolder() ? "Y" : "N");
        jsonObj.put("split", excel.isStepNrInFilename() ? "Y" : "N");
        jsonObj.put("add_date", excel.isDateInFilename() ? "Y" : "N");
        jsonObj.put("add_time", excel.isTimeInFilename() ? "Y" : "N");
        jsonObj.put("SpecifyFormat", excel.isSpecifyFormat() ? "Y" : "N");
        jsonObj.put("date_time_format", excel.getDateTimeFormat());
        jsonObj.put("sheetname", excel.getSheetname());
        jsonObj.put("autosizecolums", excel.isAutoSizeColums()?"Y":"N");
        jsonObj.put("nullisblank",excel.isNullBlank()?"Y":"N");
        jsonObj.put("protect_sheet",excel.isSheetProtected()?"Y":"N");
        jsonObj.put("password", Encr.encryptPasswordIfNotUsingVariables(excel.getPassword()));
        jsonObj.put("splitevery",excel.getSplitEvery());
        jsonObj.put("usetempfiles", excel.isUseTempFiles() ? "Y" : "N");
        jsonObj.put("tempdirectory", excel.getTempDirectory());
        e.setAttribute("file", jsonObj.toString());

        jsonObj=new JSONObject();
        jsonObj.put("enabled",excel.isTemplateEnabled()?"Y":"N");
        jsonObj.put("append", excel.isTemplateAppend() ? "Y" : "N");
        jsonObj.put("filename", excel.getTemplateFileName());
        e.setAttribute("template",jsonObj.toString());

        JSONArray jsonArray = new JSONArray();
        ExcelField[] excelFields = excel.getOutputFields();
        for(int j=0; j<excelFields.length; j++) {
            JSONObject jsonObject = new JSONObject();
            ExcelField field = excelFields[j];
            jsonObject.put("name", field.getName());
            jsonObject.put("type", field.getTypeDesc());
            jsonObject.put("format",field.getFormat());
            jsonArray.add(jsonObject);
        }
        e.setAttribute("fields",jsonArray.toString());

        jsonObj=new JSONObject();
        jsonObj.put("header_font_name", excel.getHeaderFontName() >= 0 && excel.getHeaderFontName() < excel.font_name_code.length ? excel.font_name_code[excel.getHeaderFontName()] : excel.font_name_code[0]);
        jsonObj.put("header_font_size",excel.getHeaderFontSize());
        jsonObj.put("header_font_bold", excel.isHeaderFontBold()?"Y":"N");
        jsonObj.put("header_font_italic",excel.isHeaderFontItalic()?"Y":"N");
        jsonObj.put("header_font_underline",excel.getHeaderFontUnderline()>=0&&excel.getHeaderFontUnderline()<excel.font_underline_code.length?excel.font_underline_code[excel.getHeaderFontUnderline()]:excel.font_underline_code[0]);
        jsonObj.put("header_font_orientation",excel.getHeaderFontOrientation()>=0&&excel.getHeaderFontOrientation()<excel.font_orientation_code.length?excel.font_orientation_code[excel.getHeaderFontOrientation()]:excel.font_orientation_code[0]);
        jsonObj.put("header_font_color",excel.getHeaderFontColor()>=0&&excel.getHeaderFontColor()<excel.font_color_code.length?excel.font_color_code[excel.getHeaderFontColor()]:excel.font_color_code[0]);
        jsonObj.put("header_background_color",excel.getHeaderBackGroundColor()>=0&&excel.getHeaderBackGroundColor()<excel.font_color_code.length?excel.font_color_code[excel.getHeaderBackGroundColor()]:excel.font_color_code[0]);
        jsonObj.put("header_row_height", excel.getHeaderRowHeight());
        jsonObj.put("header_alignment",excel.getHeaderAlignment()>=0&&excel.getHeaderAlignment()<excel.font_alignment_code.length?excel.font_alignment_code[excel.getHeaderAlignment()]:excel.font_alignment_code[0]);
        jsonObj.put("header_image", excel.getHeaderImage());
        jsonObj.put("row_font_name",excel.getRowFontName()>=0&&excel.getRowFontName()<excel.font_name_code.length?excel.font_name_code[excel.getRowFontName()]:excel.font_name_code[0]);
        jsonObj.put("row_font_size",excel.getRowFontSize());
        jsonObj.put("row_font_color",excel.getRowFontColor()>=0&&excel.getRowFontColor()<excel.font_color_code.length?excel.font_color_code[excel.getRowFontColor()]:excel.font_color_code[0]);
        jsonObj.put("row_background_color", excel.getRowBackGroundColor()>=0&&excel.getRowBackGroundColor()<excel.font_color_code.length?excel.font_color_code[excel.getRowBackGroundColor()]:excel.font_color_code[0]);
        e.setAttribute("custom",jsonObj.toString());
        return e;
    }
}

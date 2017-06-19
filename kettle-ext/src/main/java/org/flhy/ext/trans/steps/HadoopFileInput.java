package org.flhy.ext.trans.steps;

import com.mxgraph.model.mxCell;
import org.flhy.ext.trans.step.AbstractStep;
import org.pentaho.di.core.database.DatabaseMeta;
import org.pentaho.di.trans.step.StepMetaInterface;
import org.pentaho.metastore.api.IMetaStore;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.w3c.dom.Element;

import java.util.List;

/**
 * Created by cRAZY on 2017/6/9.
 */
@Component("HadoopFileInput")
@Scope("prototype")
public class HadoopFileInput extends AbstractStep {
    @Override
    public void decode(StepMetaInterface stepMetaInterface, mxCell cell, List<DatabaseMeta> databases, IMetaStore metaStore) throws Exception {
        
    }

    @Override
    public Element encode(StepMetaInterface stepMetaInterface) throws Exception {
        return null;
    }
}

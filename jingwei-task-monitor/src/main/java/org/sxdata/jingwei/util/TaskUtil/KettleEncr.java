package org.sxdata.jingwei.util.TaskUtil;



import java.math.BigInteger;
import java.util.List;

/**
 * Desc:
 * email: zhangqj@zjhcsoft.com
 * Created by ZhangQingJing on 2015/7/17 13:14
 */
public class KettleEncr {
    private static final int RADIX = 16;
    private static final String SEED = "0933910847463829827159347601486730416058";
    public static void main(String[] args) {
       String x = decryptPasswd("Encrypted 2be98afc86aa7f2e4cb79ce10cc9da0ce");
        System.out.println(x);
        String cluster = encryptPassword("3xdata209");
        System.out.println(cluster);

    }


    public static  final  String decryptPasswd(String encryptedFromKettle){
        return  decryptPassword(encryptedFromKettle.replace("Encrypted ",""));
    }

    public static final String encryptPassword(String password)
    {
        if (password==null) return "";
        if (password.length()==0) return "";

        BigInteger bi_passwd = new BigInteger(password.getBytes());

        BigInteger bi_r0  = new BigInteger(SEED);
        BigInteger bi_r1  = bi_r0.xor(bi_passwd);

        return bi_r1.toString(RADIX);
    }

    private static final String decryptPassword(String encrypted)
    {
        if (encrypted==null) return "";
        if (encrypted.length()==0) return "";

        BigInteger bi_confuse  = new BigInteger(SEED);

        try
        {
            BigInteger bi_r1 = new BigInteger(encrypted, RADIX);
            BigInteger bi_r0 = bi_r1.xor(bi_confuse);

            return new String(bi_r0.toByteArray());
        }
        catch(Exception e)
        {
            return "";
        }
    }

}

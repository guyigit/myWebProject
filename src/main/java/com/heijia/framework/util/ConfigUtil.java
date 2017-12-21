package com.heijia.framework.util;

import java.util.Enumeration;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

/**
 * Created by lihaopeng on 2017/12/20.
 */
public class ConfigUtil {

    private static final ResourceBundle RESOURCE_BUNDLE = ResourceBundle.getBundle("applicationConfig");

    public static String getValue(String key) {
        try {
            return RESOURCE_BUNDLE.getString(key);
        } catch (MissingResourceException e) {
            return null;
        }
    }

    public static String getValue(String key, String defaultValue) {
        try {
            return RESOURCE_BUNDLE.getString(key);
        } catch (MissingResourceException e) {
            return defaultValue;
        }
    }

    public static Enumeration<String> keys() {
        return RESOURCE_BUNDLE.getKeys();
    }


}

package com.person.website.base;

/**
 * 返回特定数据结果类
 * @author 赵李
 */
public class Result {
    private Integer code;
    private Object data;
    private String mes;

    public Result() {
    }

    public Result(Integer code, Object data, String mes) {
        this.code = code;
        this.data = data;
        this.mes = mes;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMes() {
        return mes;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    @Override
    public String toString() {
        return "Result{" +
                "code=" + code +
                ", data=" + data +
                ", mes='" + mes + '\'' +
                '}';
    }
}

package com.person.website.config;


/**
 * 阿里支付参数配置类
 * @author 赵李
 */
public class AlipayConfig {
    public static final String APP_ID = "2021000118605653";
    public static final String APP_PRIVATE_KEY = "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCn9Kwy/URGpY1Si4sKGnwjkRf0eqBLA/UwBR4AyLoGL76AiK7yyUQ2MDkkh3OMdoSWCjMedoN0IKYmRbQUP3ra4QV5S7VhDNeo/5r0qujTms5W2Ugs5LmxOQRtUWn+cfpGm0F7U8y+tyGRabfWNzIeT/hE3JDcxuDHUlPvr7npdniFb20bL5eAlQuQDRQLMDAanwEqxhXKQyQXStXvvON7SFsHVczWMaPiGciNqEqR/anA0LeFr3ozK5SNmZEGMFU7aTPQtVdJoXWvV30970zgdFnqvZ5KbJB3tBGNKDsXTQREM944wjWFXQSAx+AiK3PbFoRgP62P1LOX0owgD5k3AgMBAAECggEBAIYSJx+w0r6+Sri40a2oBK5zlTbAaJJZP3EstI2VrgFgPWbnNRhzl3LWPdcuFQvsU9xdmf7YRgj+QwNMIvsCzXRJqg/wYoJtOP4bxDtI7wBzlAD6A8ZqctzIkgMduUm2/D0+lB/5ffhDwZUNWgWzG9vcpGd71luWmjoiOwSbNwHoF6EzxsTgkXqsuTKjEKy4oexr5MDK9BOh3Dg3bp/bl7vT9qJKbc55bn8asbwvAAF9hhB+OlnufNogr0TOkXWDuTvug0aClnqfKr/6zaTPXl2vXt/3fwObm2ozzFQcY4E4E6FEaFJb8ES5B2ltwCJwO/9Lri195XV6VcZupf6TFqkCgYEA29kxRU3xgSDWSF3aiDhZ/BlmDxfjJOwzedzNCF9Yux6Y1O9eBX9eb9/wFn80CGdNk62uI5oQ0NDrqcbTs1uXUmg3YVFrrJ/DyShfx+OZk8XCnMcMAjTaAB4afWg5FlQoiq3jCeuaIt+fXom09WZ8WLuhDNubz8OxcLKBpIj7WT0CgYEAw5L9nbmzjrPNt6pW+e1Iw9tWn5iy6ZfJceUXyRNI3nWYPlSGGUy9DPxPNFmBiw/UgB2Jfg0Eq9ZYAWp9Cl4VRC7xXqymi0krIprlVx30aA8X3zDxgh1DD2Tum/qmwIRuJrcWPgKv3hGyw7/NQFGBJQoOejLqHKRXJ6o5ynadm4MCgYEAgSXGtuLBw0xp9NsFfE42Nk0pUiaDLfZ/is/1tjxkoI+p0jTHc81NycSwgla5V1JwFRfLG2jvBewk9HgzdsKQUz2bgtTUvvSfi/Tmx0LhvhhHadfYKxenFLiacR8foglQQ59Ap1w7EM9zDJMytZI969ZVFnuPvW5FN2H1nJVHqjUCgYBAScZSnaOXiiVadYUHvOdJcoVkCwbs4HdYmC0cbNlsPw2fl5tJH7+ZUCsdEzsRIlABGTSEGfVqIxhkxsN5r/mfoyq2q1xHtvKV+oLfAzq/Jg770BPjaIkNu2jwHxHHgQDQeyi1k56KChlQXXEz7lbcfRTLOIdaiO8ZW8yJcDpYzwKBgQDMMYLp8f9hFn5DTmECWJi3UU8dqJEc1P4/rXOIiPvswzddn2hY+A4k89xSe02jK3B1/vjnugMpOEkBU0Kp4TI3ycWLSyQPmIylZbkH4a2joydsywjI09fsfWWn5TbWAkaV2MHEMl6/ktwFMU0ghDFtvy4z3egRRfM25B1gWVZvcQ==";
    public static final String CHARSET = "UTF-8";
    public static final String ALIPAY_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhXK2PdhlNuerbixfxuFVsWFN6ikNoKOF5zb+53L5eK/vWRIYnXdTNul8DfkIZ17ISFxTAbse6V8qsW1LgWr8iubxIA77jrKOBw6PYzPcj1zvojgASm17osXGXP392xAzb7ZTzBLbnMcvAXP+c/yJgDqjOcm7vL4AQ3AJfN/Yr4P6ynwkhOJitJimS1qsB22MKzaFvQhbp8nIuNGFgl2B5RyDmQYWOd7RBIFXG41p6nAr78ubuOOvktdG9C+5mTl6+aTFN5Kwuq0DIEjiiZl3hDeq3hCq/DmwwzUXVaJzelmhwBehIlGln9ibEIAw7FNIHFOD8FV+KymrRjrjNEZisQIDAQAB";
    //这是沙箱接口路径,正式路径为https://openapi.alipay.com/gateway.do
    public static final String GATEWAY_URL ="https://openapi.alipaydev.com/gateway.do";
    public static final String FORMAT = "JSON";
    //签名方式
    public static final String SIGN_TYPE = "RSA2";
    //支付宝异步通知路径,付款完毕后会异步调用本项目的方法,必须为公网地址
    public static final String NOTIFY_URL = "http://ranran.free.idcfengye.com/xiaomuzi/alipay/notifyUrl.action";
    //支付宝同步通知路径,也就是当付款完毕后跳转本项目的页面,可以不是公网地址
    public static final String RETURN_URL = "http://localhost:8080/xiaomuzi/alipay/returnUrl.action";
    //跳转到个人中心
    public static final String PERSONAL_URL = "http://localhost:8080/xiaomuzi/static/font/personal/personal.html";
}

package com.person.website.web;

import com.person.website.pojo.Resume;
import com.person.website.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 个人简历控制器
 * @author 赵李
 */
@Controller
@RequestMapping("/resume")
public class ResumeController {
    @Autowired
    private ResumeService resumeService;

    /**
     * 用户的简历更新
     * @param resume 简历属性
     * @return 返回简历属性
     */
    @PostMapping(value = "/update.action",produces = {"application/json;charset=UTF-8"})
    public @ResponseBody
    Resume update(@RequestBody Resume resume){
        //进行数据更新
        int result = resumeService.renewResumeByUserId(resume);

        //数据查询
        return resumeService.findResumeByUserId(resume.getUserId());
    }

    /**
     * 根据用户id查找个人简历信息
     * @param userId 用户id
     * @return 返回简历属性
     */
    @PostMapping("/select.action")
    public @ResponseBody Resume selectByUserId(String userId){
        return resumeService.findResumeByUserId(userId);
    }
}

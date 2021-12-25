package com.person.website.service;

import com.person.website.pojo.Resume;

/**
 * 个人简历接口
 * @author 赵李
 */
public interface ResumeService {
    int renewResumeByUserId(Resume resume);

    Resume findResumeByUserId(String userId);

    int add(String userId);
}

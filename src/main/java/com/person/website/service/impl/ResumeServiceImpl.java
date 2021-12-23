package com.person.website.service.impl;

import com.person.website.mapper.ResumeMapper;
import com.person.website.pojo.Resume;
import com.person.website.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResumeServiceImpl implements ResumeService {
    @Autowired
    private ResumeMapper resumeMapper;

    @Override
    public int renewResumeByUserId(Resume resume) {
        return resumeMapper.updateByUserIdSelective(resume);
    }

    @Override
    public Resume findResumeByUserId(String userId) {
        return resumeMapper.selectByUserId(userId);
    }

    @Override
    public int add(String userId) {
        return resumeMapper.insertUserId(userId);
    }
}

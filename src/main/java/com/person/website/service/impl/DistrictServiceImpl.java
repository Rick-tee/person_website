package com.person.website.service.impl;

import com.person.website.mapper.DistrictMapper;
import com.person.website.pojo.District;
import com.person.website.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictServiceImpl implements DistrictService {
    @Autowired
    private DistrictMapper districtMapper;
    @Override
    public List<District> findAllProvince() {
        return districtMapper.selectAllProvince();
    }
}

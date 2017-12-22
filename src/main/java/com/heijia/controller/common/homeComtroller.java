package com.heijia.controller.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by lihaopeng on 2017/12/20.
 */
@Controller
@RequestMapping("/home")
public class homeComtroller extends commonController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView homeIndex(HttpServletRequest request, HttpServletResponse response) throws IOException{
        return innerCreateModelAndView("home");
    }
}

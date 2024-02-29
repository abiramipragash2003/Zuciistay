package com.zuci.ZuciIStay.controller;

import com.zuci.ZuciIStay.model.Booking;
import com.zuci.ZuciIStay.model.BookingData;
import com.zuci.ZuciIStay.service.HotelBookingService;
import com.zuci.ZuciIStay.service.JwtUtilityService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin
public class HotelBookingController {

    @Autowired
    private JwtUtilityService jwtUtilityService;
    @Autowired
    HotelBookingService hotelBookingService;
    @PostMapping("/bookingAdd")
    public Booking createHotelBooking(@Valid @RequestBody Booking booking, HttpServletRequest request)
    {
//        String authHeader = request.getHeader("Authorization");
//        System.out.println(authHeader);
//        String token = null;
//        String username = null;
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            token = authHeader.substring(7);
//            // token = authHeader.substring("Bearer ".length());
//            System.out.println("************************************");
//            System.out.println(token);
//            System.out.println("************************************");
//            username = jwtUtilityService.extractUsername(token);
//        }
        return hotelBookingService.createBooking(booking);
    }
    @GetMapping("/bookingAll")
    public List<Booking> getAllHotelBooking()
    {
        return hotelBookingService.getAllBooking();
    }
    @GetMapping("/book/{id}")
    public Booking getHotelBookingById(@PathVariable("id") int id)
    {
        return hotelBookingService.getBookingById(id);
    }
    @DeleteMapping("/booking/{bookingId}")
    public String deleteHotelBooking(@PathVariable("bookingId") int bookingId)
    {
        return hotelBookingService.DeleteBookingById(bookingId);
    }
    @PostMapping("/booking")
    public boolean roomBookingByCheck(@RequestBody BookingData bookingData) {
        return hotelBookingService.roomBookingByCheck(bookingData);
    }
    @GetMapping("/booking/{username}")
    public List<Booking> getBookingDataOfUser(@PathVariable("username") String username)
    {
        return hotelBookingService.getBookingByUsername(username);
    }


}

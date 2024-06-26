﻿using AutoMapper;
using etiqa.Domain.Abstraction.Repositories;
using etiqa.Domain.Model;
using etiqaAPI.Dto.UserDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace etiqaAPI.Controllers
{
   
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userRepository.GetUserAsync(userId);

            if (user is null)
                return NotFound();

            return Ok(user);

        }

       
        [HttpGet]
        public async Task<IActionResult> GetUsersAsync(int pageNumber, int pageSize)
        {
       
           var user = await _userRepository.GetUsersAsync(pageNumber, pageSize);
           var userDto = _mapper.Map<List<GetUserDto>>(user);
           return Ok(userDto);
        
        }

        [HttpPut]
        public async Task<IActionResult> EditUserAsync(EditUserDto userDto)
        {

            var user = _mapper.Map<User>(userDto);
            var result =  await _userRepository.EditUserAsync(user);

            return Ok(userDto);
           
       
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(int userId)
        {

            //  var user = _mapper.Map<User>(userdto);
            var result =  _userRepository.DeleteUserAsync(userId);

            return Ok();
        }


        
    
    }
}

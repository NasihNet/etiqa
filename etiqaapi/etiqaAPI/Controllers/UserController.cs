using AutoMapper;
using etiqa.Domain.Abstraction.Repositories;
using etiqa.Domain.Model;
using etiqaAPI.Dto.UserDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace etiqaAPI.Controllers
{
   
    [ApiController]
    [Route("api/[controller]")]
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
        public async Task<IActionResult> GetUsersAsync()
        {
            List<GetUserDto> UserListDto = new List<GetUserDto>();
            var userdtoin = new GetUserDto()
            {
                Id = 15,
                UserName = "aria93",
                Email = "aria@gmail.com",
                PhoneNumber = "0194421514",
                Hobby = "eating",
                SkillSets = ".net core",

            };
            UserListDto.Add(userdtoin);

            return Ok(UserListDto);
           // var user = await _userRepository.GetUsersAsync();
          //  var userDto = _mapper.Map<List<GetUserDto>>(user);
           // return Ok(userdtoin);
        
        }

        [HttpPut]
        public async Task<IActionResult> EditUserAsync(User user)
        {

            //var user = _mapper.Map<User>(userdto);
            var result =  _userRepository.EditUserAsync(user);

            return Ok(result);
           
       
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(int userId)
        {

            //  var user = _mapper.Map<User>(userdto);
            var result = _userRepository.DeleteUserAsync(userId);

            return Ok();
        }


        
    
    }
}

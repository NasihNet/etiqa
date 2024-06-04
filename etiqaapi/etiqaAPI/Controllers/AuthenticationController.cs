
using AutoMapper;
using etiqa.Domain.Abstraction.Repositories;
using etiqa.Domain.Abstraction.Services;
using etiqa.Domain.CustomException;
using etiqa.Domain.Model;
using etiqaAPI.Dto.AuthenticationDto;
using etiqaAPI.Dto.UserDto;
using Microsoft.AspNetCore.Mvc;

namespace etiqaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   public class AuthenticationController : Controller
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(IAuthenticationService authenticationService,
            IMapper mapper,
            IUserRepository userRepository,
            ILogger<AuthenticationController> logger)
        {
            _authenticationService = authenticationService;
            _mapper = mapper;
            _userRepository = userRepository;
            _logger = logger;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody]CreateUserDto userdto)
        {
            try
            {
                
                var user = _mapper.Map<User>(userdto);

                var result = await _authenticationService.SignUp(user);
                _logger.LogInformation("");
              
                return Created("", result);
            }
            catch (EmailAlreadyExist e)
            {
                return NotFound(e.Message);
             
            }
        
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody]SignInDto userdto)
        {
            try
            {
                var checkUser = await _userRepository.GetUserByEmailAsync(userdto.Email);

                var user = _mapper.Map<User>(userdto);
                var result = await _authenticationService.SignIn(user);
                return Ok(result);
            }
            catch (InvalidCredentialsException e)
            {
                return Unauthorized(e.Message);
               

            }catch (Exception e)
            {

                throw;
            }

          
          
         
        }
    }
}

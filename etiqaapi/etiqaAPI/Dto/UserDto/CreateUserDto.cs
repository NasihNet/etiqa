namespace etiqaAPI.Dto.UserDto
{
    public class CreateUserDto
    {
       
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? ConfirmPasswordHash { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Hobby { get; set; }
        public string? SkillSets { get; set; }


    }
}

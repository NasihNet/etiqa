namespace etiqaAPI.Dto.AuthenticationDto
{
    public class SignInDto
    {
        public string Email { get; set; }

        public string PasswordHash { get; set; }
    }
}

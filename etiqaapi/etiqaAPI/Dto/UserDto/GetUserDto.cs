﻿namespace etiqaAPI.Dto.UserDto
{
    public class GetUserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string SkillSets { get; set; }
        public string Hobby { get; set; }
    }
}

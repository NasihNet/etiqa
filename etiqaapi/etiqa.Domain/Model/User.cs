﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace etiqa.Domain.Model
{
    public class User
    {
       
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public string? PhoneNumber { get; set; }
        public string? SkillSets { get; set; }

        public string? Hobby { get; set; }
        public List<UserRole> UserRoles { get; set; }
    }
}

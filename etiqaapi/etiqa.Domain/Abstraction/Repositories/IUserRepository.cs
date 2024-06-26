﻿using etiqa.Domain.Model;


namespace etiqa.Domain.Abstraction.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserAsync(int id);

        Task<User> GetUserByEmailAsync(string email);

        Task<ICollection<User>> GetUsersAsync(int pageNumber, int pageSize);

        Task<User> CreateUserAsync(User user);

        Task<User> EditUserAsync(User user);

        Task<User> DeleteUserAsync(int userId);
    }
}


using etiqa.Domain.Abstraction.Repositories;
using etiqa.Domain.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace etiqa.Dal.Repositories
{
    public class UserRepository : IUserRepository
    {   private readonly DataContext _appDbContext;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(DataContext appDbContext, ILogger<UserRepository>logger)
        {
            _appDbContext = appDbContext;
            _logger = logger;
        }

        public async Task<User> CreateUserAsync(User user)
        {
            _logger.LogInformation("CreateUserAsync called with user: {user}", user);
            _appDbContext.Users.Add(user);
             await _appDbContext.SaveChangesAsync();
             return user;
        }

        public async Task<User> DeleteUserAsync(int userId)
        {
            _logger.LogInformation("DeleteUserAsync called with userId: {userId}", userId);
            var user = _appDbContext.Users.FirstOrDefault(x => x.Id == userId);
        
            _appDbContext.Users.Remove(user);
            await _appDbContext.SaveChangesAsync();
            return user;
        }

        public async Task<User> EditUserAsync(User user)
        {
            try
            {
                _logger.LogInformation("EditUserAsync called with user: {user}", user);
                var result =  _appDbContext.Users.Include(x => x.UserRoles).Where(x => x.Id == user.Id).FirstOrDefault();

                if (result == null)
                {
                    throw new Exception("User not found");
                }

                result.Email = user.Email;
                result.UserName = user.UserName;
                result.PhoneNumber = user.PhoneNumber;
                result.Hobby = user.Hobby;
                result.SkillSets = user.SkillSets;

                _appDbContext.Users.Update(result);
                await _appDbContext.SaveChangesAsync();

                return user;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error in EditUserAsync: {message}", e.Message);
                Console.WriteLine(e.StackTrace);
                throw; // Rethrow the exception to be handled by the calling method
            }
        }

        public async Task<User> GetUserAsync(int id)
        {
            _logger.LogInformation("GetUserAsync called with id: {id}", id);
            var user = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            return user;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            _logger.LogInformation("GetUserAsync called with id: {email}", email);
            var user = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
            return user;
        }

        public async Task<ICollection<User>> GetUsersAsync(int pageNumber, int pageSize)
        {
            _logger.LogInformation("GetUsersAsync called with pageNumber: {pageNumber}, pageSize: {pageSize}", pageNumber, pageSize);
            return await _appDbContext.Users.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        }

      

    }
}

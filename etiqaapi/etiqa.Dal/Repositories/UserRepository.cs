
using etiqa.Domain.Abstraction.Repositories;
using etiqa.Domain.Model;
using Microsoft.EntityFrameworkCore;


namespace etiqa.Dal.Repositories
{
    public class UserRepository : IUserRepository
    {   private readonly DataContext _appDbContext;
        public UserRepository(DataContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<User> CreateUserAsync(User user)
        {
             _appDbContext.Users.Add(user);
             await _appDbContext.SaveChangesAsync();
             return user;
        }

        public async Task<User> DeleteUserAsync(int userId)
        {
            var user = _appDbContext.Users.FirstOrDefault(x => x.Id == userId);
        
            _appDbContext.Users.Remove(user);
            await _appDbContext.SaveChangesAsync();
            return user;
        }

        public async Task<User> EditUserAsync(User user)
        {
            try
            {
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
                // Log the exception details
                Console.WriteLine($"Error in EditUserAsync: {e.Message}");
                Console.WriteLine(e.StackTrace);
                throw; // Rethrow the exception to be handled by the calling method
            }
        }

        public async Task<User> GetUserAsync(int id)
        {
           var user = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

        
            return user;
        }

        public async Task<ICollection<User>> GetUsersAsync()
        {
            return await _appDbContext.Users.ToListAsync();
        }

      

    }
}

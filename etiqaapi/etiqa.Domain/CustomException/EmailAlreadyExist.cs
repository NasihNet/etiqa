using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace etiqa.Domain.CustomException
{
    public class EmailAlreadyExist : Exception
    {
        public EmailAlreadyExist(string message) : base(message)
        {
        }
    }
}

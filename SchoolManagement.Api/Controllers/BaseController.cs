using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SchoolManagement.Api.Controllers
{
    /// <summary>
    /// BaseController
    /// </summary>
    [Authorize]
    [ApiController]
    public class BaseController : ControllerBase
    {
        public BaseController()
        {
        }
    }
}

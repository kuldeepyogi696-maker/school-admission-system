using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolAPI.Data;
using SchoolAPI.Models;

namespace SchoolAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InquiryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InquiryController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/inquiry
        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var data = _context.Inquiryfrom.OrderByDescending(i => i.Id).ToList();
            return Ok(data);
        }

        // POST api/inquiry
        [HttpPost]
        public IActionResult SaveInquiry(Inquiry data)
        {
            _context.Inquiryfrom.Add(data);
            _context.SaveChanges();
            return Ok();
        }

        // PUT api/inquiry/5
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateInquiry(int id, [FromBody] Inquiry updated)
        {
            try
            {
                var existing = _context.Inquiryfrom.Find(id);
                if (existing == null)
                {
                    return NotFound(new { message = "Record not found" });
                }

                existing.StudentName = updated.StudentName;
                existing.ParentName = updated.ParentName;
                existing.Email = updated.Email;
                existing.MobileNumber = updated.MobileNumber;

                _context.SaveChanges();

                return Ok(new { message = "Data Updated Successfully", data = existing });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message, InnerError = ex.InnerException?.Message });
            }
        }

        // DELETE api/inquiry/5
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteInquiry(int id)
        {
            try
            {
                var existing = _context.Inquiryfrom.Find(id);
                if (existing == null)
                {
                    return NotFound(new { message = "Record not found" });
                }

                _context.Inquiryfrom.Remove(existing);
                _context.SaveChanges();

                return Ok(new { message = "Data Deleted Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message, InnerError = ex.InnerException?.Message });
            }
        }
    }
}
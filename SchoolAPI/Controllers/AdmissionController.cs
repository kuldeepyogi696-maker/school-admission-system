using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolAPI.Data;
using SchoolAPI.Models;

namespace SchoolAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdmissionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdmissionController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/admission  (admin only - list all admissions)
        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var data = _context.Fullfrom.OrderByDescending(a => a.Id).ToList();
            return Ok(data);
        }

        // POST api/admission
        [HttpPost]
        public IActionResult SaveAdmission([FromBody] Admission student)
        {
            try
            {
                _context.Fullfrom.Add(student);
                _context.SaveChanges();

                return Ok(new
                {
                    message = "Data Saved Successfully",
                    data = student
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Message = ex.Message,
                    InnerError = ex.InnerException?.Message
                });
            }
        }

        // PUT api/admission/5  (update an existing admission)
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateAdmission(int id, [FromBody] Admission updatedStudent)
        {
            try
            {
                var existing = _context.Fullfrom.Find(id);
                if (existing == null)
                {
                    return NotFound(new { message = "Record not found" });
                }

                existing.StudentName = updatedStudent.StudentName;
                existing.DOB = updatedStudent.DOB;
                existing.Gender = updatedStudent.Gender;
                existing.FatherName = updatedStudent.FatherName;
                existing.MotherName = updatedStudent.MotherName;
                existing.MobileNumber = updatedStudent.MobileNumber;
                existing.Email = updatedStudent.Email;
                existing.FullAddress = updatedStudent.FullAddress;
                existing.SelectClass = updatedStudent.SelectClass;

                _context.SaveChanges();

                return Ok(new
                {
                    message = "Data Updated Successfully",
                    data = existing
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Message = ex.Message,
                    InnerError = ex.InnerException?.Message
                });
            }
        }

        // DELETE api/admission/5
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteAdmission(int id)
        {
            try
            {
                var existing = _context.Fullfrom.Find(id);
                if (existing == null)
                {
                    return NotFound(new { message = "Record not found" });
                }

                _context.Fullfrom.Remove(existing);
                _context.SaveChanges();

                return Ok(new { message = "Data Deleted Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Message = ex.Message,
                    InnerError = ex.InnerException?.Message
                });
            }
        }
    }
}
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace etiqa.Dal.Migrations
{
    /// <inheritdoc />
    public partial class updateskillsetsspeling : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "skillsets",
                table: "Users",
                newName: "SkillSets");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SkillSets",
                table: "Users",
                newName: "skillsets");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Onlinelearningplat.Migrations
{
    /// <inheritdoc />
    public partial class AddPlatformIDToCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PlatformID",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_PlatformID",
                table: "Courses",
                column: "PlatformID");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Platforms_PlatformID",
                table: "Courses",
                column: "PlatformID",
                principalTable: "Platforms",
                principalColumn: "PlatformID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Platforms_PlatformID",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_PlatformID",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "PlatformID",
                table: "Courses");
        }
    }
}

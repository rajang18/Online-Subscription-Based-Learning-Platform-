using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Onlinelearningplat.Migrations
{
    /// <inheritdoc />
    public partial class AddPriceDurationInstructorRating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPlatforms_Platforms_PlatformID",
                table: "UserPlatforms");

            migrationBuilder.DropForeignKey(
                name: "FK_UserPlatforms_Users_UserID",
                table: "UserPlatforms");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "UserPlatforms",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "PlatformID",
                table: "UserPlatforms",
                newName: "PlatformId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "UserPlatforms",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "SwitchedOn",
                table: "UserPlatforms",
                newName: "AssignedDate");

            migrationBuilder.RenameIndex(
                name: "IX_UserPlatforms_UserID",
                table: "UserPlatforms",
                newName: "IX_UserPlatforms_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserPlatforms_PlatformID",
                table: "UserPlatforms",
                newName: "IX_UserPlatforms_PlatformId");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "UserPlatforms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "SwitchedDate",
                table: "UserPlatforms",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Instructor",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Courses",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Courses",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddForeignKey(
                name: "FK_UserPlatforms_Platforms_PlatformId",
                table: "UserPlatforms",
                column: "PlatformId",
                principalTable: "Platforms",
                principalColumn: "PlatformID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserPlatforms_Users_UserId",
                table: "UserPlatforms",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPlatforms_Platforms_PlatformId",
                table: "UserPlatforms");

            migrationBuilder.DropForeignKey(
                name: "FK_UserPlatforms_Users_UserId",
                table: "UserPlatforms");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "UserPlatforms");

            migrationBuilder.DropColumn(
                name: "SwitchedDate",
                table: "UserPlatforms");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Instructor",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserPlatforms",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "PlatformId",
                table: "UserPlatforms",
                newName: "PlatformID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UserPlatforms",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "AssignedDate",
                table: "UserPlatforms",
                newName: "SwitchedOn");

            migrationBuilder.RenameIndex(
                name: "IX_UserPlatforms_UserId",
                table: "UserPlatforms",
                newName: "IX_UserPlatforms_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_UserPlatforms_PlatformId",
                table: "UserPlatforms",
                newName: "IX_UserPlatforms_PlatformID");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPlatforms_Platforms_PlatformID",
                table: "UserPlatforms",
                column: "PlatformID",
                principalTable: "Platforms",
                principalColumn: "PlatformID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserPlatforms_Users_UserID",
                table: "UserPlatforms",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

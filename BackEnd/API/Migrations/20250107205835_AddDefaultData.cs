using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddDefaultData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "Email", "LastName", "Name", "Password" },
                values: new object[,]
                {
                    { 1, "admin@gmail.com", "admin1", "admin1", "12345678" },
                    { 2, "admin2@gmail.com", "admin2", "admin2", "12345678" }
                });

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "Birth", "Email", "FirstName", "LastName", "Password", "PersonalID", "PersonalIDType", "Phone" },
                values: new object[,]
                {
                    { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Marcos@gmail.com", "Marcos", "Rodriguez", "$2a$11$noQ8s1RjbkQZwJrNqMQwHOiZ.pkaBFX1LAqOwh8x4JpEFFnO.0uEy", "34098349", 0, "+54934245673748" },
                    { 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Marcos@gmail.com", "Marcos", "Rodriguez", "$2a$11$JzvfksetW830zaqg163A9OtL2A9Qir93GhQMIay7qNyhFIMJ.Wl5u", "49298349", 0, "+54934245673748" },
                    { 3, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Marcos@gmail.com", "Marcos", "Rodriguez", "$2a$11$H/Sg5axHJm57BOraho9jVOX3kZkVt2ENbV2krhDM7uDPIsWEzCFh.", "AA34098349", 1, "+54934245673748" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}

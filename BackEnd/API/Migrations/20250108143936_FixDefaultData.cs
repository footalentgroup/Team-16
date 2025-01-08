using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class FixDefaultData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$7K2jj5UO0QHUDa1dfagVJuH1JHvqjRAHoe1/M3Flr/oDlkrWxp88O");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$9cBvl7/4CNZJEfYPxloey.lIPdlKiFSt180X8QSc1sJlsS/PMRyy6");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$JTk4hTrNFyKOGca/F1OCJOJl5sWVsOAm2p9hjW4S0aCbDlwWHG7Ee");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$SBru0NyV3wZAQudjKAZm2.B0MYvFAHctkuV/B/3gJdCVcVpDXb/J2");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$30.xde363/zzWbr2AILh2ORNZbDqwkkXfXkWRcAVpxbFHgP5gQUuW");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "12345678");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "12345678");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$noQ8s1RjbkQZwJrNqMQwHOiZ.pkaBFX1LAqOwh8x4JpEFFnO.0uEy");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$JzvfksetW830zaqg163A9OtL2A9Qir93GhQMIay7qNyhFIMJ.Wl5u");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$H/Sg5axHJm57BOraho9jVOX3kZkVt2ENbV2krhDM7uDPIsWEzCFh.");
        }
    }
}

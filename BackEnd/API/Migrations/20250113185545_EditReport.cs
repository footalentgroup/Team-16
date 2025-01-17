using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class EditReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Observations",
                table: "Reports",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Priority",
                table: "Reports",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$BMsTKkf7xX8I/t1HhaUMe.vnwJLNI4NZXZvi4bCpyFf8wBU5rrOyS");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$sAd/mheBCz3ScWjDzb37MOpg4dWPQOYiYPekyoEeMKIfvBbieDA9u");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$omkoFbHC9Up5CDzvZiy21epi/CTSlUg175lPSQR.GzBHB7nARCSTi");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$TNFgm43Wr0HKkd8KOkIULOkzGVrAQJScbgW35KzeUsQoRS4stYEj2");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$6J0EAMqc9MHccVHH8tVnr.J1r1hrgOGdSye/7wMgHH.pxTETj1Cau");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Observations",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Reports");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$ZTrQCICmkkLAV9micXF8B.yktXRD1xvEVgRzGMdsGRRSF5jXbmyb6");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$rw1J4blFJ6bCCgsBWEy5nOB5tgzUUeT8GS4kW0hZue7q/ec6wdD16");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$u9WWjJ4rEVlAWtet1jCuzOANhLeboMI42GHR.Ecpzdz.1CROfYoM.");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$w1Qt3R2m35KOh9nZbfrUcOK9rpNDF6VUX.AQif1pNF/NZu6yQCD6m");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$5fpq1F/DAmGKk2NB2T1MhuUYJz2Lo7rOv1U3QFfDvYR72ZIMUyePq");
        }
    }
}

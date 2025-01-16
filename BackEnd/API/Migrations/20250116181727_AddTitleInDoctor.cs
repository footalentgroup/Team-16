using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddTitleInDoctor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Doctors",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$DgVp2uNMuJDnxy.sLHqKOOrlSx7TuSjzkkms6E02vksnHR.lpHDTC");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$QcIgbE1i1oQWnUx6XpMB7.lDznB097LZgv/0mDJv4L.0udsn3Wrla");

            migrationBuilder.UpdateData(
                table: "Doctors",
                keyColumn: "Id",
                keyValue: 1,
                column: "Title",
                value: "");

            migrationBuilder.UpdateData(
                table: "Doctors",
                keyColumn: "Id",
                keyValue: 2,
                column: "Title",
                value: "");

            migrationBuilder.UpdateData(
                table: "Doctors",
                keyColumn: "Id",
                keyValue: 3,
                column: "Title",
                value: "");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$HaoDLkBJH.jG3944BFVyC.Gi85LnWc.hwnqU0H72eUBHHqWYSPQTy");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$1Jz9YRFn3dAWcKJ6mynzyOoFX0W1P3yURm5SM5tMFMH4Xq0xPF.cO");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$gaLRQC9mHOXBVNSiKKBC9ODlE7B6yARPPUJUSDXxDmrFvEnc1abcK");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Doctors");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$HKpqx1b9tKtqOz98Ll0iRuixre8vYWNOsJLvfvy8RT6osqNfpL71a");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$4gCwtVIQqlRRrJZ/JRKvL.UmGPLLJf48/03mEjIP4fR3K3uT0rltG");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$IGNcsH5RZMzI.lMWL5LN..Hz5wUhkSclVsj06Ro4ERY06L.v3s2yG");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$eU/p68MtFpsNPSTltG/3du06Cr2g6NFXdXuIBnZFDPT/HJwkojT.C");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$sDnuXVA4ci2tZk5MTeWYluPJMpQhEuoXL/dG5OwcKJI2iWrRsLjZO");
        }
    }
}

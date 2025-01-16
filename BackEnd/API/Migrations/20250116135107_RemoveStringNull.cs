using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class RemoveStringNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Priority",
                table: "Reports",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Observations",
                table: "Reports",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Priority",
                table: "Reports",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Observations",
                table: "Reports",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$TxOqj5B0YE8F/vbd3atZEe2m8hKr6B./s2IOEj91SrK4h/J1RabXa");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$v1VORySFZ3b5WX530OGR8Otk2x3/cyeOIf7YMBNsKxN/mn/ppnE3m");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$Fc/hsGbVrSe9B/yBFlLPmOI0subjKXrw27s3tRiFR/B/EMHtq5462");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$kHICLGQeUv6PNCpICiRtceh73/C9BfcR1cH.vXRoGVFHZOqNagydS");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$iGfXsdLbsl5dfcMFyHlkGez/2CV.rrwDaTkF/Di.Vyzx2b27imLQW");
        }
    }
}

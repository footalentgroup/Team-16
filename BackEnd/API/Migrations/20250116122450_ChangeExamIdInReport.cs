using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ChangeExamIdInReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ExamIds",
                table: "Reports",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(int[]),
                oldType: "integer[]",
                oldNullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int[]>(
                name: "ExamIds",
                table: "Reports",
                type: "integer[]",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$QPdVrs0yIagRIdbz5rTkp.zh8wcGSdVanKvBn0OEY1lmpzN6Mv6zW");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$yMyR79kmcIyYmtxSxft5ceeYwWgg291EvqmooCgl2IPodm089aogO");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$5/x9Nv3LgmjwmpIsFNpBh.ef2/5bjFnKGANWh9yjjzdn8EeC0JZ0S");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$Fy0J0N0b.lx1P8X4nrmLPeq0B8l8fCwMGY/4Pp5k1iZhN/7s7ih0O");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$wxK.3S.sbpyBaYAcOuVwKOIzpwpciUWYxLjrZsK5WwlrJC9m7.eve");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class RemoveIdExamInResult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Exams_ExamId",
                table: "Results");

            migrationBuilder.DropIndex(
                name: "IX_Results_ExamId",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "ExamId",
                table: "Results");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExamId",
                table: "Results",
                type: "integer",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.CreateIndex(
                name: "IX_Results_ExamId",
                table: "Results",
                column: "ExamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Exams_ExamId",
                table: "Results",
                column: "ExamId",
                principalTable: "Exams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

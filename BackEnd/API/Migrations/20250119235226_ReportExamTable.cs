using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ReportExamTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Reports_ReportId",
                table: "Results");

            migrationBuilder.DropTable(
                name: "Reports");

            migrationBuilder.RenameColumn(
                name: "ReportId",
                table: "Results",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Results_ReportId",
                table: "Results",
                newName: "IX_Results_OrderId");

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Priority = table.Column<string>(type: "text", nullable: false),
                    Observations = table.Column<string>(type: "text", nullable: false),
                    DateExam = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PatientId = table.Column<int>(type: "integer", nullable: false),
                    DoctorId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Doctors_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "Doctors",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderExam",
                columns: table => new
                {
                    ExamId = table.Column<int>(type: "integer", nullable: false),
                    OrderId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderExam", x => new { x.OrderId, x.ExamId });
                    table.ForeignKey(
                        name: "FK_OrderExam_Exams_ExamId",
                        column: x => x.ExamId,
                        principalTable: "Exams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderExam_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$VtfTkNf7kghc7N/tQertZ.QZzRUopjdP2kvtBM.J9nRGnnVp99y8K");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$kVarQSgLVX2UjLuxkXmnEOus4m9E.QhpL3svIA6Jqbjn2Grcz6aga");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$kTX.cz6YSvlN4NNgCvJGzObdaGaS5yan5Evqr/a69ShJDha20OMOS");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$7J9QIwtrade6SiB29qFNCO9lqwHtMarYoUEphtfFkrA.I/3mscQTa");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$5QVfAytSzIo0gBpWiMBj0OtK0PMrImDTds2f4xId9BVymAD/wi3Cy");

            migrationBuilder.CreateIndex(
                name: "IX_OrderExam_ExamId",
                table: "OrderExam",
                column: "ExamId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DoctorId",
                table: "Orders",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PatientId",
                table: "Orders",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Orders_OrderId",
                table: "Results",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Orders_OrderId",
                table: "Results");

            migrationBuilder.DropTable(
                name: "OrderExam");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Results",
                newName: "ReportId");

            migrationBuilder.RenameIndex(
                name: "IX_Results_OrderId",
                table: "Results",
                newName: "IX_Results_ReportId");

            migrationBuilder.CreateTable(
                name: "Reports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DoctorId = table.Column<int>(type: "integer", nullable: true),
                    PatientId = table.Column<int>(type: "integer", nullable: false),
                    DateExam = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExamIds = table.Column<string>(type: "text", nullable: false),
                    Observations = table.Column<string>(type: "text", nullable: false),
                    Priority = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reports_Doctors_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "Doctors",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Reports_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Reports_DoctorId",
                table: "Reports",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_PatientId",
                table: "Reports",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Reports_ReportId",
                table: "Results",
                column: "ReportId",
                principalTable: "Reports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

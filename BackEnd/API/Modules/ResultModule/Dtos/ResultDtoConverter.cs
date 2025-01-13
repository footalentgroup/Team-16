using System.Text.Json;
using System.Text.Json.Serialization;

namespace API.Modules.ResultModule.Dtos
{
    public class ResultDtoConverter : JsonConverter<ResultResponseDto>
    {
        public override ResultResponseDto Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            using JsonDocument doc = JsonDocument.ParseValue(ref reader);
            var root = doc.RootElement;

            if (root.TryGetProperty("type", out JsonElement typeElement))
            {
                string type = typeElement.GetString()!;

                if (type == "qualitative")
                {
                    return JsonSerializer.Deserialize<QuantitativeResponseResultDto>(root.GetRawText(), options)!;
                }
                else if (type == "quantitative")
                {
                    return JsonSerializer.Deserialize<QuantitativeResponseResultDto>(root.GetRawText(), options)!;
                }
                else
                {
                    throw new JsonException($"type desconocido, acepta 'qualitative' y 'quantitative': {type}");
                }
            }
            else
            {
                throw new JsonException("type debe contener, type: quantitative | qualitative");
            }
        }

        public override void Write(Utf8JsonWriter writer, ResultResponseDto value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, value, value.GetType(), options);
        }
    }
}

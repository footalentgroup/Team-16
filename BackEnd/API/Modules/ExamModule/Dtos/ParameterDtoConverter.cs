using System.Text.Json;
using System.Text.Json.Serialization;
using API.Modules.ExamModule.Dtos;

public class ParameterDtoConverter : JsonConverter<ParameterDto>
{
  public override ParameterDto Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
  {
    using JsonDocument doc = JsonDocument.ParseValue(ref reader);
    var root = doc.RootElement;

    if (root.TryGetProperty("type", out JsonElement typeElement))
    {
      string type = typeElement.GetString()!;

      if (type == "qualitative")
      {
        return JsonSerializer.Deserialize<QualitativeParameterDto>(root.GetRawText(), options)!;
      }
      else if (type == "quantitative")
      {
        return JsonSerializer.Deserialize<QuantitativeParameterDto>(root.GetRawText(), options)!;
      }
      else
      {
        throw new JsonException($"Tipo de parametro desconocido, acepta 'qualitative' y 'quantitative': {type}");
      }
    }
    else
    {
      throw new JsonException("Parametro no posee tipo, debe contener, type: quantitative | qualitative");
    }
  }

  public override void Write(Utf8JsonWriter writer, ParameterDto value, JsonSerializerOptions options)
  {
    JsonSerializer.Serialize(writer, value, value.GetType(), options);
  }
}

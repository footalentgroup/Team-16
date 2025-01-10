using API.DataBase.Context;
using API.DataBase.Entities;
using API.DataBase.Repository;
using API.Modules.ResultModule.Dtos;
using API.Modules.ResultModule.Interfaces;
using AutoMapper;

namespace API.Modules.ResultModule
{

    public class ResultService : BaseRepository<Result>, IResultService
    {
        private readonly IMapper _mapper;

        public ResultService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
            _mapper = mapper;
        }

        public async Task<List<Result>> CreataManyAsync(List<CreateResultDto> resultsDto)
        {

            var results = _mapper.Map<List<Result>>(resultsDto);

            await _dbSet.AddRangeAsync(results);
            await _context.SaveChangesAsync();

            return results;

        }
    }
}
class Api::V1::SubmissionsController < ApplicationController

    def create 
        @submission = Submission.new(submission_params)
        if @submission.save
            render json: { submission: @submission_params }, status: :created
        else 
            render json: { error: 'failed to create post' }, status: :not_acceptable
        end
    end

    def index
        submissions = Submission.all 
        render json: submissions
    end

    private

    def submission_params 
        params.require(:submission).permit(:link, :category_id, :user_id)
    end

end


